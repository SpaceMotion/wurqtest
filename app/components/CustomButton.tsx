import React from "react"
import { Button } from "app/components/Button"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { colors, typography } from "app/theme"

interface Props {
  label: string
  style?: StyleProp<ViewStyle>
}

export function CustomButton({label, style}: Props) {
  return (
    <Button
      text={label}
      style={[styles.container, style]}
      textStyle={styles.text}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 11,
    minHeight: 44,
  },
  text: {
    color: colors.palette.washedBlack,
    fontFamily: typography.fonts.montserrat.bold,
    fontSize: 20,
  },
})
