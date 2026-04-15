export interface SlackNotification {
  level: "info" | "warn" | "error";
  title: string;
  message: string;
  fields?: Record<string, string>;
}

const SLACK_LEVEL_COLORS: Record<SlackNotification["level"], string> = {
  error: "#C53D3D",
  warn: "#B7791F",
  info: "#2B6CB0"
};

function buildFieldElements(
  fields: Record<string, string>
): Array<{ type: "mrkdwn"; text: string }> {
  return Object.entries(fields).map(([key, value]) => ({
    type: "mrkdwn",
    text: `*${key}:* ${value}`
  }));
}

function formatDuration(durationMs: number): string {
  if (durationMs < 1000) {
    return `${durationMs}ms`;
  }

  const totalSeconds = Math.round(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    seconds > 0 ? `${seconds}s` : null
  ].filter((part): part is string => part !== null);

  return parts.length > 0 ? parts.join(" ") : "0s";
}

export async function sendSlackNotification(notification: SlackNotification): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  const blocks: Array<Record<string, unknown>> = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: notification.title,
        emoji: true
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: notification.message
      }
    }
  ];

  if (notification.fields && Object.keys(notification.fields).length > 0) {
    blocks.push({
      type: "context",
      elements: buildFieldElements(notification.fields)
    });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      attachments: [
        {
          color: SLACK_LEVEL_COLORS[notification.level],
          blocks
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Slack webhook request failed with status ${response.status}.`);
  }
}

export async function notifyPipelineError(
  runId: string,
  jobName: string,
  error: Error
): Promise<void> {
  await sendSlackNotification({
    level: "error",
    title: "🚨 パイプラインエラー",
    message: `\`${jobName}\` の実行中にエラーが発生しました。`,
    fields: {
      runId,
      jobName,
      errorMessage: error.message,
      timestamp: new Date().toISOString()
    }
  });
}

export async function notifyPipelineComplete(
  runId: string,
  jobCount: number,
  durationMs: number
): Promise<void> {
  await sendSlackNotification({
    level: "info",
    title: "✅ パイプライン完了",
    message: `パイプラインが正常完了しました。`,
    fields: {
      runId,
      jobs: String(jobCount),
      duration: formatDuration(durationMs)
    }
  });
}
