import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native'

import onboardingitem from '../components/onboardingitem';
import slides from '../slides.js';

export default Onboarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <view>
            <FlatList data={slides} renderItem={({ item }) => <onboardingitem item={item} />} 
            
            horizontal

            showsHorizontalScrollIndicator

            pagingEnabled
            
            bounces={false}

            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
                useNativeDriver: false,

            })}

            onViewableItemsChanged={viewableItemsChanged}

            viewabilityConfig={viewConfig}
            ref={slideRef}
            />
        </view>

    );
};