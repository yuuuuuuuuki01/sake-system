-- 035: 見込み顧客テーブル（CRM / 見積連携）
CREATE TABLE IF NOT EXISTS prospects (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name            text NOT NULL,
  contact_name            text,
  email                   text,
  phone                   text,
  address                 text,
  website                 text,
  business_type           text,
  stage                   text NOT NULL DEFAULT 'warm'
                            CHECK (stage IN ('cold','warm','hot','contacted','negotiating','won','lost')),
  source                  text,
  expected_amount         bigint NOT NULL DEFAULT 0,
  probability             int NOT NULL DEFAULT 30,
  assigned_staff_code     text,
  next_action_date        date,
  next_action             text,
  note                    text,
  last_contact_at         timestamptz,
  won_at                  timestamptz,
  lost_at                 timestamptz,
  lost_reason             text,
  converted_customer_code text,
  converted_prospect_id   uuid,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS prospect_activities (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id   uuid NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('call','visit','email','proposal','demo','sample')),
  title         text,
  note          text,
  activity_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prospects_stage   ON prospects(stage);
CREATE INDEX IF NOT EXISTS idx_prospects_updated ON prospects(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospect_act_pid  ON prospect_activities(prospect_id);

ALTER TABLE prospects           ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "prospects_public"    ON prospects           FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prospect_act_public" ON prospect_activities FOR ALL USING (true) WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON prospects           TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON prospect_activities TO anon, authenticated;
