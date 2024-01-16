import React from 'react'
import { TextField } from "app/components/TextField"
import { KeyboardType, StyleProp, StyleSheet, ViewStyle } from "react-native"
import { colors, typography } from "app/theme"

interface Props {
  label: string
  value?: string | number
  style?: StyleProp<ViewStyle>
  pattern?: RegExp
  onChange(text: string): void
  keyboardType?: KeyboardType
}

export function CustomTextField({label, value, style, pattern, onChange, keyboardType}: Props) {
  if (typeof value === 'number') {
    value = value.toString()
  }

  function onChangeText(value: string) {
    if (!pattern || pattern.test(value)) {
      onChange(value)
    }
  }

  return (
    <TextField
      LabelTextProps={{style: styles.text}}
      label={label}
      inputWrapperStyle={styles.field}
      value={value}
      style={styles.text}
      containerStyle={style}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: colors.palette.darkGunmetal,
    borderRadius: 11,
    borderWidth: 0,
    height: 46,
    paddingHorizontal: 20,
  },
  text: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.regular,
    fontSize: 15,
    lineHeight: 15,
    marginHorizontal: 0,
  },
})
