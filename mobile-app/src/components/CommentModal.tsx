import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Modal, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, Dimensions, LayoutAnimation, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
import { Ionicons } from '@expo/vector-icons';
import { rs } from '../utils/scaling';

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
}

const screenHeight = Dimensions.get('window').height;

const CommentItem = ({ name, date, tag, avatar, text, isAi, repliesCount, replies }: any) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };


  const getTagStyle = (t: string) => {
    switch (t) {
      case 'Public': return { bg: '#dcfce7', text: '#15803d' };
      case 'Connected': return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'Circle': return { bg: '#f3e8ff', text: '#7e22ce' };
      default: return { bg: '#f3f4f6', text: '#4b5563' };
    }
  };
  const tagStyle = getTagStyle(tag);

  return (
    <View style={styles.commentRow}>
      <Image source={avatar} style={styles.commentAvatar} resizeMode="contain" />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={[styles.commentName, isAi && { color: '#b45309' }]}>{name}</Text>
          <Text style={styles.commentDate}>{date}</Text>
          {tag && (
            <View style={[styles.tagPill, { backgroundColor: tagStyle.bg }]}>
              <Text style={[styles.tagText, { color: tagStyle.text }]}>{tag}</Text>
            </View>
          )}
        </View>
        <View style={[styles.commentBubble, isAi && styles.aiBubble]}>
          <Text style={[styles.commentText, isAi && { color: '#78350f' }]}>{text}</Text>
        </View>
        {replies && replies.length > 0 && (
          <TouchableOpacity style={styles.repliesBtn} onPress={toggleExpand}>
            <View style={styles.repliesIcon}>
              <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={rs(12)} color="#fff" />
            </View>
            <Text style={styles.repliesText}>{expanded ? "Hide replies" : `${replies.length} replies`}</Text>
          </TouchableOpacity>
        )}

        {expanded && replies && (
          <View style={styles.repliesContainer}>
            {replies.map((reply: any, index: number) => (
              <View key={index} style={styles.replyRow}>
                <View style={[styles.replyAvatar, { backgroundColor: reply.color }]} />
                <View style={styles.replyContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentName}>{reply.name}</Text>
                    <Text style={styles.commentDate}>{reply.date}</Text>
                    {reply.tag && (
                      <View style={[styles.tagPill, { backgroundColor: getTagStyle(reply.tag).bg }]}>
                        <Text style={[styles.tagText, { color: getTagStyle(reply.tag).text }]}>{reply.tag}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.replyBubble}>
                    <Text style={styles.commentText}>{reply.text}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const COMMENTS_DATA = [
  { name: "Sarah Chen", date: "15/09/2026, 08:41", tag: "Public", avatar: require('../../assets/images/Avatar_AlexKim.png'), text: "I like the overall direction, but why did we choose this muted palette?", replies: [
    { name: "Jake Miller", date: "15/09, 08:45", tag: "Connected", color: "#facc15", text: "Yeah, I was wondering the same — maybe warmer tones?" },
    { name: "Linh Nguyen", date: "15/09, 08:46", tag: "Circle", color: "#e879f9", text: "The muted palette works for the premium feel though." }
  ] },
  { name: "AI Assistant", date: "15/09/2026, 08:43", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Warmer tones could make the palette feel more inviting while keeping the same soft, premium mood.", isAi: true },
  { name: "Jake Miller", date: "16/09/2026, 08:47", tag: "Connected", avatar: require('../../assets/images/avatar_v3_Sunny.png'), text: "The spacing between sections feels a bit tight, especially around the middle content blocks." },
  { name: "AI Assistant", date: "16/09/2026, 08:49", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Try adding a bit more padding between sections so the layout breathes and the hierarchy is easier to scan.", isAi: true },
  { name: "Linh Nguyen", date: "16/09/2026, 08:53", tag: "Circle", avatar: require('../../assets/images/avatar_v3_Honey.png'), text: "I love the typography. Maybe the headings could be a little bigger to feel more confident?" },
  { name: "AI Assistant", date: "16/09/2026, 08:55", tag: "Public", avatar: require('../../assets/images/ai_login.png'), text: "Agreed - bumping the main headings to around 24px and the subheadings to 18px would help a lot.", isAi: true },
  { name: "Sarah Chen", date: "17/09/2026, 08:58", tag: "Public", avatar: require('../../assets/images/Avatar_AlexKim.png'), text: "Has anyone checked how this looks on mobile? I'm worried the layout might feel cramped." },
  { name: "Jake Miller", date: "17/09/2026, 09:01", tag: "Connected", avatar: require('../../assets/images/avatar_v3_Sunny.png'), text: "Good catch. Once we tighten the spacing, I think it should hold up nicely on smaller screens. 👍" }
];

export default function CommentModal({ visible, onClose }: CommentModalProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 8,
          speed: 12
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      scaleAnim.setValue(0.9);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => onClose());
  };

  const FilterPill = ({ label, bg, textClr }: any) => {
    const isActive = activeFilter === label;
    return (
      <TouchableOpacity 
        style={[styles.filterPill, { backgroundColor: isActive && label === 'All' ? '#fcd34d' : bg }]} 
        onPress={() => setActiveFilter(label)}
      >
        <Text style={[styles.filterText, { color: isActive && label === 'All' ? '#000' : textClr }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
          <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.dragHandle} />
            
            <View style={{ height: rs(40) }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersWrapper}>
                <FilterPill label="All" bg="#f3f4f6" textClr="#4b5563" />
                <FilterPill label="Public" bg="#dcfce7" textClr="#15803d" />
                <FilterPill label="Connected" bg="#dbeafe" textClr="#1d4ed8" />
                <FilterPill label="Circle" bg="#f3e8ff" textClr="#7e22ce" />
              </ScrollView>
            </View>

            <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: rs(20) }}>
              {COMMENTS_DATA.filter(c => activeFilter === 'All' || c.tag === activeFilter).map((c, index) => (
                <CommentItem 
                  key={index}
                  name={c.name}
                  date={c.date}
                  tag={c.tag}
                  avatar={c.avatar}
                  text={c.text}
                  isAi={c.isAi}
                  replies={c.replies}
                />
              ))}
            </ScrollView>

            <View style={styles.inputArea}>
              <View style={styles.inputBorder}>
                <TextInput style={styles.input} placeholder="Add a comment..." placeholderTextColor="#9ca3af" />
                <TouchableOpacity style={styles.sendBtn}>
                  <Ionicons name="send-outline" size={rs(16)} color="#d97706" style={{ transform: [{ rotate: '-45deg' }], marginLeft: rs(4) }} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: rs(24),
    width: '90%',
    height: screenHeight * 0.7,
    paddingTop: rs(16),
    borderWidth: 2,
    borderColor: '#f59e0b',
    overflow: 'hidden',
  },
  dragHandle: {
    width: rs(60),
    height: rs(6),
    backgroundColor: '#f59e0b',
    borderRadius: rs(3),
    alignSelf: 'center',
    marginBottom: rs(20),
  },
  filtersWrapper: {
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  filterPill: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(6),
    borderRadius: rs(20),
    marginRight: rs(10),
    height: rs(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: 'AfacadFlux_600SemiBold',
    fontSize: rs(13),
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: rs(20),
    marginTop: rs(10),
  },
  commentRow: {
    flexDirection: 'row',
    marginBottom: rs(20),
  },
  commentAvatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    marginRight: rs(12),
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(8),
    flexWrap: 'wrap',
  },
  commentName: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(15),
    color: '#374151',
    marginRight: rs(8),
  },
  commentDate: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(12),
    color: '#9ca3af',
    marginRight: rs(8),
  },
  tagPill: {
    paddingHorizontal: rs(8),
    paddingVertical: rs(2),
    borderRadius: rs(10),
  },
  tagText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(10),
  },
  commentBubble: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rs(20),
    borderTopLeftRadius: rs(4),
    padding: rs(16),
  },
  aiBubble: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  commentText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(14),
    color: '#4b5563',
    lineHeight: rs(22),
  },
  repliesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(12),
  },
  repliesIcon: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    backgroundColor: '#fcd34d',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rs(8),
  },
  repliesText: {
    fontFamily: 'AfacadFlux_500Medium',
    fontSize: rs(13),
    color: '#9ca3af',
  },
  repliesContainer: {
    marginTop: rs(12),
  },
  replyRow: {
    flexDirection: 'row',
    marginBottom: rs(12),
  },
  replyAvatar: {
    width: rs(24),
    height: rs(24),
    borderRadius: rs(12),
    marginRight: rs(10),
    marginTop: rs(4),
  },
  replyContent: {
    flex: 1,
  },
  replyBubble: {
    backgroundColor: '#f5f0e1',
    borderRadius: rs(16),
    borderTopLeftRadius: rs(4),
    padding: rs(12),
  },
  inputArea: {
    paddingHorizontal: rs(20),
    paddingVertical: rs(16),
    paddingBottom: rs(24),
    backgroundColor: '#fff',
  },
  inputBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: rs(30),
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
  },
  input: {
    flex: 1,
    fontFamily: 'AfacadFlux_400Regular',
    fontSize: rs(15),
    color: '#374151',
    height: rs(40),
  },
  sendBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    borderWidth: 1.5,
    borderColor: '#fcd34d',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rs(12),
  },
});
