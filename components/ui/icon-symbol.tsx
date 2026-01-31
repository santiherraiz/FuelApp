import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
    // See MaterialIcons here: https://icons.expo.fyi
    // See SF Symbols in the SF Symbols app on Mac.
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
    'map.fill': 'map',
    'magnifyingglass': 'search',
} as Partial<
    Record<
        string,
        React.ComponentProps<typeof MaterialIcons>['name']
    >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
    name,
    size = 24,
    color,
    style,
}: {
    name: string;
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
}) {
    return <MaterialIcons color={color} size={size} name={MAPPING[name] ?? 'help'} style={style} />;
}
