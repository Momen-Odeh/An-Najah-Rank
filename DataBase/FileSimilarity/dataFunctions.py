import re

def separatePersante(strVal):
    regex = r"(.+)\s\((\d+%)\)"  # (Number)
    match = re.match(regex, strVal)
    return [match.group(1), match.group(2)]

def merge_ranges(arr):
    # Convert strings to tuples of integers
    ranges = [tuple(map(int, s.split('-'))) for s in arr]

    # Sort the ranges based on the start values
    ranges.sort(key=lambda x: x[0])

    merged_ranges = [ranges[0]]

    for current_range in ranges[1:]:
        # Compare the current range with the last merged range
        last_merged_range = merged_ranges[-1]

        # Check for overlap or adjacent ranges
        if current_range[0] <= last_merged_range[1] + 1:
            # Merge ranges if there is an overlap or they are adjacent
            merged_ranges[-1] = (last_merged_range[0], max(last_merged_range[1], current_range[1]))
        else:
            # Add the current range if no overlap
            merged_ranges.append(current_range)

    # Convert tuples back to strings
    result = [f"{start}-{end}" for start, end in merged_ranges]
    return result