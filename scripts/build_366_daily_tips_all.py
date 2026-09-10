import json
import os

# Helper to escape quotes for JS/TS string literals
def ts_str(s):
    if s is None:
        return '""'
    escaped = s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    return f'"{escaped}"'

print("ts_str helper ready.")
