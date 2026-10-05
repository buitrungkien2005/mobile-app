import os
import re

scaling_utils_path = "src/utils/scaling.ts"

def get_relative_path(from_file, to_file):
    from_dir = os.path.dirname(os.path.abspath(from_file))
    to_abs = os.path.abspath(to_file)
    rel_path = os.path.relpath(to_abs, from_dir)
    # Strip extension
    rel_path = os.path.splitext(rel_path)[0]
    # Replace backslashes
    rel_path = rel_path.replace('\\', '/')
    if not rel_path.startswith('.'):
        rel_path = './' + rel_path
    return rel_path

props = [
    "width", "height", "marginTop", "marginBottom", "marginLeft", "marginRight",
    "marginHorizontal", "marginVertical", "margin", "paddingTop", "paddingBottom",
    "paddingLeft", "paddingRight", "paddingHorizontal", "paddingVertical", "padding",
    "fontSize", "borderRadius", "top", "bottom", "left", "right", "lineHeight", "gap"
]
prop_pattern = r"\b(" + "|".join(props) + r"):\s*([1-9][0-9]*(?:\.[0-9]+)?|0\.[0-9]+)\b(?!%)"

size_pattern = r"\bsize=\{([1-9][0-9]*(?:\.[0-9]+)?|0\.[0-9]+)\}"

# To avoid matching rs(20) or other functions, the regex uses \b and looks for space
# However, sometimes it's width: 20 -> we want rs(20)

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts"):
            if file == "scaling.ts": continue
            
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            
            # Replace style props
            content = re.sub(prop_pattern, r"\1: rs(\2)", content)
            # Replace size props (for icons etc)
            content = re.sub(size_pattern, r"size={rs(\1)}", content)
            
            if content != original_content:
                # Need to add import
                if "import { rs }" not in content and "import {rs}" not in content:
                    rel_import = get_relative_path(filepath, scaling_utils_path)
                    import_statement = f"import {{ rs }} from '{rel_import}';\n"
                    # insert after last import
                    last_import = content.rfind("import ")
                    if last_import != -1:
                        end_of_last_import = content.find("\n", last_import) + 1
                        content = content[:end_of_last_import] + import_statement + content[end_of_last_import:]
                    else:
                        content = import_statement + content
                        
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Processed {filepath}")
