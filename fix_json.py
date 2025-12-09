
import os

file_path = r"d:\next.js\theGoodNews\messages\en.json"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 1-544 (indices 0-544)
# Skip lines 545-1087 (indices 544-1087)
# Keep lines 1088-end (indices 1087-end)

# Note: Python slicing [start:end] excludes end.
# We want to keep up to index 543 (line 544). So [:544].
# We want to start again at index 1087 (line 1088). So [1087:].

part_a = lines[:544]
part_c = lines[1087:]

new_content = "".join(part_a + part_c)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Fixed {file_path}. Original lines: {len(lines)}. New lines: {len(part_a) + len(part_c)}")
