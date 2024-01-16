import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { Screen } from "../components"
import { AppStackScreenProps } from "../navigators"
import { Image, StyleSheet } from "react-native"
import { Shadow } from 'react-native-shadow-2';
import { colors } from "app/theme"
import { useStores } from "app/models"
import { CustomTextField } from "app/components/CustomTextField"
import { CustomButton } from "app/components/CustomButton"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CustomLineChart } from "app/components/CustomLineChart"
import { History } from "app/components/History"

interface TestScreenProps extends AppStackScreenProps<"Test"> {}

export const TestScreen = observer<TestScreenProps>(function() {
  const {historyStore} = useStores()
  // eslint-disable-next-line camelcase
  const {name, points} = historyStore.history[0] || {}
  const {top: topInset, bottom: bottomInset} = useSafeAreaInsets()

  function setPoints(value: string) {
    const record = historyStore.history[0]

    if (record) {
      record.setPoints(+value)
    }
  }

  function setName(value: string) {
    const record = historyStore.history[0]

    if (record) {
      record.setName(value)
    }
  }

  useEffect(() => {
    historyStore.fetch()
  }, [])

  return (
    <Screen
      preset="auto"
      style={styles.screen}
      contentContainerStyle={{paddingBottom: bottomInset}}
    >
      <Shadow distance={7}
        startColor={'#00000025'}
        style={[styles.topBarInner, {paddingTop: topInset + 15}]}
        containerStyle={styles.topBar}
      >
        <Image source={require('assets/icons/logo.png')} />
      </Shadow>
      <CustomLineChart
        title='Points per WOD'
        data={historyStore.points_per_wod}
        style={styles.chart}
        stepValue={10}
        dataPointsRadius={6}
        thickness={2}
        xAxisThickness={1}
        stepHeight={54}
        titleStyle={styles.chartTitle}
      />
      <History style={styles.history}/>
      <CustomTextField
        label='Points'
        value={points}
        style={styles.field}
        onChange={setPoints}
        keyboardType={'number-pad'}
        pattern={/^\d*$/}
      />
      <CustomTextField
        label='Name'
        value={name}
        style={styles.field}
        onChange={setName}
        pattern={/^([a-zA-Z]+\s?)*$/}
      />
      <CustomButton label='Submit' style={styles.submit} />
    </Screen>
  )
})

const styles = StyleSheet.create({
  chart: {
    marginBottom: 5,
  },
  chartTitle: {
    marginHorizontal: 32,
  },
  field: {
    alignSelf: 'center',
    marginBottom: 39,
    width: 193,
  },
  history: {
    marginBottom: 36,
    marginHorizontal: 21,
  },
  screen: {
    backgroundColor: colors.palette.charcoal,
  },
  submit: {
    alignSelf: 'center',
    width: 193,
  },
  topBar: {
    marginBottom: 34,
  },
  topBarInner: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.palette.charcoal,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
})
