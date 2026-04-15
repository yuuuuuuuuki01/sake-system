"""Parser utilities for Magic/eDeveloper relay ingestion."""

from .magic_isam import MagicISAMReader
from .odbc_reader import MagicODBCReader

__all__ = ["MagicISAMReader", "MagicODBCReader"]
