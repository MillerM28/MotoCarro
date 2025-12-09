import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function StarRating({ rating = 0, onRatingChange, size = 40, editable = true }) {
    const [currentRating, setCurrentRating] = useState(rating);

    const handlePress = (value) => {
        if (!editable) return;
        setCurrentRating(value);
        if (onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                    key={star}
                    onPress={() => handlePress(star)}
                    disabled={!editable}
                    style={styles.starButton}
                >
                    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={[styles.star, { fontSize: size }]}>
                            {star <= currentRating ? (
                                <View style={styles.filledStar}>⭐</View>
                            ) : (
                                <View style={styles.emptyStar}>☆</View>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starButton: {
        padding: 5,
    },
    star: {
        fontSize: 40,
    },
    filledStar: {
        fontSize: 40,
    },
    emptyStar: {
        fontSize: 40,
        color: '#ccc',
    },
});
