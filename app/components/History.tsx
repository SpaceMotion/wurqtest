import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import HeartIcon from "assets/icons/heart.svg"
import React from "react"
import { colors, typography } from "app/theme"
import { useStores } from "app/models"
import parseISO from "date-fns/parseISO"

interface Props {
  style?: StyleProp<ViewStyle>
}

export function History({style}: Props) {
  const {historyStore} = useStores()
  // eslint-disable-next-line camelcase
  const {date_time, name, time: timeTotal, rest, hr, points, exercises} = historyStore.history[0] || {}
  const date = parseISO(date_time)
  const time = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
  const restStr = `${Math.floor(rest / 60)}:${rest % 60}`
  const restPercentStr = ` | ${Math.round(rest / timeTotal * 100)}%`

  return (
    <View style={style}>
      <Text style={styles.title}>History</Text>
      <View style={styles.content}>
        <View style={styles.leftBlock}>
          <View style={styles.leftTopBlock}>
            <View style={styles.leftTopBlockLeft}>
              <Text style={styles.date}>{date.toLocaleDateString()}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <HeartIcon width={16} height={13} />
          </View>
          <View style={styles.leftMiddleBlock}>
            <Text style={styles.label}>Time: </Text>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.label}>Rest: </Text>
            <Text style={styles.rest}>
              {restStr}
              <Text style={styles.restPercent}>{restPercentStr}</Text>
            </Text>
            <Text style={styles.hr}>{hr}</Text>
          </View>
          <Text style={styles.exercises}>{exercises}</Text>
        </View>
        <View style={styles.rightBlock}>
          <Text style={styles.points}>{`+${points}`}</Text>
          <Text style={styles.pointsLabel}>Total Points</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 11,
    flexDirection: 'row',
    height: 201,
    overflow: 'hidden',
  },
  date: {
    color: colors.palette.rocketMetallic,
    fontFamily: typography.fonts.montserrat.bold,
    fontSize: 11,
  },
  exercises: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.regular,
    fontSize: 11,
    marginTop: 'auto',
  },
  hr: {
    color: colors.palette.neutral100,
    flex: 1,
    fontFamily: typography.fonts.montserrat.bold,
    fontSize: 16,
    textAlign: 'right',
  },
  label: {
    color: colors.palette.gray,
    fontFamily: typography.fonts.montserrat.regular,
    fontSize: 11,
  },
  leftBlock: {
    backgroundColor: colors.palette.darkGunmetal,
    flex: 1,
    padding: 10,
  },
  leftMiddleBlock: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftTopBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 9,
    paddingRight: 33,
  },
  leftTopBlockLeft: {
    flex: 1,
  },
  name: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.bold,
    fontSize: 15,
  },
  points: {
    color: colors.palette.mintGreen,
    fontFamily: typography.fonts.montserrat.bold,
    fontSize: 32,
    marginBottom: 9,
  },
  pointsLabel: {
    color: colors.palette.gray,
    fontFamily: typography.fonts.montserrat.bold,
    fontSize: 13,
  },
  rest: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.regular,
    fontSize: 16,
  },
  restPercent: {
    fontSize: 14,
  },
  rightBlock: {
    alignItems: 'center',
    backgroundColor: colors.palette.neutral900,
    minWidth: '23%',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  time: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.bold,
    fontSize: 16,
    marginRight: 10,
  },
  title: {
    color: colors.palette.neutral100,
    fontFamily: typography.fonts.montserrat.medium,
    fontSize: 20,
    marginBottom: 56,
    paddingLeft: 12,
    textDecorationLine: 'underline',
  },
})
