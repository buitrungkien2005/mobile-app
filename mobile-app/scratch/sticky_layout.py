import re

file = 'src/app/(tabs)/home.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# The structure we are looking for is:
#       </View>
#       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
#         {/* STORIES AREA */}
#         <View style={styles.storiesContainer}>...
#         {/* FILTERS AREA */}
#         <View style={styles.filtersContainer}>...
#         <View style={styles.feedContainer}>

# Let's find the ScrollView opening tag
scroll_open = r'<ScrollView showsVerticalScrollIndicator=\{false\} contentContainerStyle=\{styles\.scrollContent\}>'
stories_start = r'\s*\{\/\* STORIES AREA \*\/\}'

# Find the end of filtersContainer.
# It ends right before <View style={styles.feedContainer}>
# We can use regex to extract everything from STORIES AREA to just before feedContainer.

pattern = re.compile(
    r'(<ScrollView showsVerticalScrollIndicator=\{false\} contentContainerStyle=\{styles\.scrollContent\}>)\s*'
    r'(\{\/\* STORIES AREA \*\/\}'
    r'.*?'
    r'\s*)(<View style=\{styles\.feedContainer\}>)',
    re.DOTALL
)

match = pattern.search(content)
if match:
    scroll_tag = match.group(1)
    stories_and_filters = match.group(2)
    feed_tag = match.group(3)
    
    # We want to put stories_and_filters BEFORE the scroll_tag
    new_layout = f"{stories_and_filters}\n      {scroll_tag}\n        {feed_tag}"
    
    content = content[:match.start()] + new_layout + content[match.end():]
    
    # Now reduce spacing between stories and filters
    # storiesContainer marginBottom: rs(20) -> rs(0)
    content = re.sub(r'(storiesContainer: \{[^\}]*marginBottom:\s*)rs\(20\)', r'\1rs(0)', content)
    
    # filtersContainer paddingVertical: rs(15) -> rs(5)
    content = content.replace('contentContainerStyle={{ paddingVertical: rs(15) }}', 'contentContainerStyle={{ paddingVertical: rs(5) }}')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Successfully moved stories and filters out of ScrollView and adjusted spacing!')
else:
    print('Regex match failed!')
