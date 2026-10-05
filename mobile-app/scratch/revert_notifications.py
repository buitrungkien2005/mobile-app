import re

file = 'src/app/(tabs)/notifications.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Revert pageTitle font
content = content.replace(
'''  pageTitle: {
    fontFamily: 'Dongle_700Bold',
    fontSize: rs(40),
    color: '#111827',
  },''',
'''  pageTitle: {
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: rs(24),
    color: '#111827',
  },'''
)

# 2. Revert emptyContainer and emptyGif styles
content = content.replace(
'''  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(40),
    marginTop: rs(100), // Push down to center vertically below header
  },
  emptyGif: {
    width: rs(320),
    height: rs(250),
    marginBottom: rs(20),
  },''',
'''  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: rs(40),
    marginTop: rs(30),
  },
  emptyGif: {
    width: rs(200),
    height: rs(150),
    marginBottom: rs(20),
  },'''
)

# 3. emptySubtext font weight
content = content.replace(
'''  emptySubtext: {
    fontFamily: 'AfacadFlux_600SemiBold',''',
'''  emptySubtext: {
    fontFamily: 'AfacadFlux_400Regular','''
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Reverted to mockup specifications!")
