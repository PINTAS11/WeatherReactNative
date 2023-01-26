import * as React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {resultType} from './List';
import './../i18n.config';
import {useTranslation} from 'react-i18next';

type ParamList = {
  Detail: {
    data: resultType;
  };
};

export default function Details(): JSX.Element {
  const {t} = useTranslation();
  const {data} = useRoute<RouteProp<ParamList, 'Detail'>>().params;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.main}>
      <View style={styles.mainInfo}>
        <View style={styles.sectionTempLocalContainer}>
          <Text style={texts.temperature}>{data.main.temp}º</Text>
          <Text style={texts.local}>
            {data.name}
            <Image
              style={{
                width: 15,
                height: 15,
              }}
              source={require('./../assets/local.png')}
            />
          </Text>
        </View>
        <View style={styles.sectionIconContainer}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={{
              uri: data.weather.icon,
            }}
          />
          <Text style={texts.description}>{data.weather.description}</Text>
        </View>
      </View>
      <View style={[styles.infoTempContainer]}>
        <Text style={texts.infoTemp}>
          {data.main.temp_max}º / {data.main.temp_min}º {t('feels_like')}{' '}
          {data.main.feels_like}º
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardSection}>
          <Text style={texts.cardNormal}>{t('sunrise')}</Text>
          <Text style={texts.cardBold}>{data.sys.sunrise}</Text>
          <Image
            style={{
              width: 70,
              height: 70,
            }}
            source={require('./../assets/sunrise.png')}
          />
        </View>
        <View style={styles.cardSection}>
          <Text style={texts.cardNormal}>{t('sunset')}</Text>
          <Text style={texts.cardBold}>{data.sys.sunset}</Text>
          <Image
            style={{
              width: 70,
              height: 70,
            }}
            source={require('./../assets/sunset.png')}
          />
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardSection}>
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={require('./../assets/humidity.png')}
          />
          <Text style={texts.cardBold}>{t('humidity')}</Text>
          <Text style={texts.cardOpaque}>{data.main.humidity}%</Text>
        </View>
        <View style={styles.cardSection}>
          <View style={styles.cardSection}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={require('./../assets/wind.png')}
            />
            <Text style={texts.cardBold}>{t('wind')}</Text>
            <Text style={texts.cardOpaque}>{data.wind.speed} km/h</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
  },
  mainInfo: {
    flexDirection: 'row',
  },
  sectionTempLocalContainer: {
    flex: 0.7,
    marginTop: 50,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  infoTempContainer: {
    marginTop: 30,
    marginBottom: 70,
    paddingLeft: 20,
  },
  sectionIconContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    margin: 10,
    padding: 10,
    backgroundColor: '#Fff',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardSection: {
    alignItems: 'center',
  },
});
const texts = StyleSheet.create({
  temperature: {
    fontSize: 50,
    fontWeight: '200',
  },
  infoTemp: {
    fontWeight: '600',
  },
  local: {},
  description: {},
  cardNormal: {},
  cardBold: {
    fontWeight: '600',
  },
  cardOpaque: {
    opacity: 0.7,
  },
});
