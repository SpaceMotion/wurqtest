import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"
import { LineChart } from "react-native-gifted-charts"
import { colors, typography } from "app/theme"
import React, { memo } from "react"

interface Props {
  title: string
  data: number[]
  style?: StyleProp<ViewStyle>
  stepValue: number
  dataPointsRadius?: number
  thickness?: number
  xAxisThickness?: number
  stepHeight?: number
  titleStyle?: StyleProp<TextStyle>
}

export const CustomLineChart = memo(function({
  data,
  title,
  style,
  stepValue,
  dataPointsRadius,
  thickness,
  xAxisThickness,
  stepHeight,
  titleStyle
}: Props) {
  const $data = data.map(value => ({
    value,
    dataPointColor: Math.random() > 0.5 ? colors.palette.mintGreen : colors.palette.neutral100
  }))

  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  let yAxisMinValue = minValue
  let yAxisMaxValue = maxValue
  const restFromMinValue = minValue % stepValue
  const restFromMaxValue = maxValue % stepValue

  if (restFromMinValue !== 0) {
    if (minValue > 0) {
      yAxisMinValue = minValue - restFromMinValue
    } else {
      yAxisMinValue = minValue - (stepValue + restFromMinValue)
    }
  }
  if (restFromMaxValue !== 0) {
    if (maxValue > 0) {
      yAxisMaxValue = stepValue - restFromMaxValue + maxValue
    } else {
      yAxisMaxValue = maxValue - restFromMaxValue
    }
  }

  let noOfSections = 0
  let noOfSectionsBelowXAxis = 0

  if (yAxisMaxValue > 0) {
    if (yAxisMinValue > 0) {
      noOfSections = (yAxisMaxValue - yAxisMinValue) / stepValue
    } else {
      noOfSections = yAxisMaxValue / stepValue
    }
  }
  if (yAxisMinValue < 0) {
    if (yAxisMaxValue < 0) {
      noOfSectionsBelowXAxis = Math.abs((yAxisMinValue - yAxisMaxValue) / stepValue)
    } else {
      noOfSectionsBelowXAxis = Math.abs(yAxisMinValue / stepValue)
    }
  }

  return (
    <View style={style}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <LineChart
        data={$data}
        yAxisTextStyle={styles.yAxis}
        dataPointsRadius={dataPointsRadius}
        thickness={thickness}
        color={colors.palette.neutral100}
        stepValue={stepValue}
        maxValue={yAxisMaxValue}
        mostNegativeValue={yAxisMinValue}
        noOfSections={noOfSections}
        noOfSectionsBelowXAxis={noOfSectionsBelowXAxis}
        xAxisType={'dashed'}
        xAxisColor={colors.palette.neutral100}
        xAxisThickness={xAxisThickness}
        stepHeight={stepHeight}
        yAxisColor={colors.palette.neutral100}
        backgroundColor={colors.palette.infinity}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  title: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.semiBold,
    fontSize: 15,
  },
  yAxis: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.medium,
    fontSize: 11
  }
})
