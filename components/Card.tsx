import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface CardProps extends TouchableOpacityProps {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onPress, ...props }) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            className={`bg-surface rounded-xl p-4 shadow-card border border-gray-100 ${className}`}
            activeOpacity={onPress ? 0.7 : 1}
            onPress={onPress}
            {...props}
        >
            {children}
        </Container>
    );
};
