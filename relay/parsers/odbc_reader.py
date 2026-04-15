from __future__ import annotations

from typing import Any

FILE_TABLE_MAP = {
    "SKDEN.DAT": "sales_document_headers",
    "SKHSK.DAT": "customer_payment_status",
    "SK2MM.MST": "customers",
    "H5SYO.MST": "products",
}


class MagicODBCReader:
    """Read Magic data through an ODBC DSN."""

    def __init__(self, dsn: str) -> None:
        try:
            import pyodbc  # type: ignore
        except ImportError as exc:
            raise ImportError("pyodbc is required for ODBC mode") from exc

        self._pyodbc = pyodbc
        self._dsn = dsn
        self._connection = pyodbc.connect(f"DSN={dsn}", autocommit=True)

    def close(self) -> None:
        self._connection.close()

    def fetch_table(self, source_name: str) -> list[dict[str, Any]]:
        table_name = FILE_TABLE_MAP.get(source_name.upper(), source_name.rsplit(".", 1)[0])
        cursor = self._connection.cursor()
        try:
            cursor.execute(f"SELECT * FROM {table_name}")
            columns = [column[0] for column in cursor.description or []]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]
        finally:
            cursor.close()
