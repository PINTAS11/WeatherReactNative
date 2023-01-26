import * as React from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {API_KEY} from './../properties';

import './../i18n.config';
import {useTranslation} from 'react-i18next';

interface weatherType {
  weather: {
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: string;
    sunset: string;
  };
}

const getWeatherFromApi = async (
  t: Function,
  lat: number,
  lon: number,
): Promise<weatherType> => {
  var data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  ).then(response => response.json());

  return {
    weather: {
      description: t(data.weather[0].main),
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    },
    main: {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
    sys: {
      sunrise: `${new Date(data.sys.sunrise * 1000).getHours()}:${new Date(
        data.sys.sunrise * 1000,
      ).getMinutes()}`,
      sunset: `${new Date(data.sys.sunset * 1000).getHours()}:${new Date(
        data.sys.sunset * 1000,
      ).getMinutes()}`,
    },
  };
};

interface coordinatesResultType {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const getCoordinatesFromApi = async (
  t: Function,
  region: string,
): Promise<coordinatesResultType> => {
  const data: any = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${region}&limit=1&appid=${API_KEY}`,
  ).then(response => response.json());

  const json = data[0];
  return {
    name: json.name,
    country: t(json.country),
    lat: json.lat,
    lon: json.lon,
  };
};

type Region = PropsWithChildren<{
  data: resultType;
}>;

function Region({data}: Region): JSX.Element {
  const navigation = useNavigation();

  const action = () => {
    navigation.navigate(
      'Details' as never,
      {
        data,
      } as never,
    );
  };

  return (
    <TouchableHighlight onPress={() => action()} underlayColor="white">
      <View style={styles.Container}>
        <View style={styles.sectionTempLocalContainer}>
          <View style={styles.tempContainer}>
            <Text style={texts.temperature}>{data.main.temp}º</Text>
          </View>
          <View style={[styles.localContainer]}>
            <Text style={texts.description}>{data.weather.description}</Text>
            <Text style={texts.local}>
              {data.name}, {data.country}
            </Text>
          </View>
        </View>
        <View style={styles.sectionIconContainer}>
          <Image
            style={{
              width: 66,
              height: 58,
            }}
            source={{
              uri: data.weather.icon,
            }}
          />
        </View>
        <View style={styles.sectionInfoContainer}>
          <View style={styles.humidityContainer}>
            <Image
              style={{
                width: 15,
                height: 15,
              }}
              source={require('./../assets/drop.png')}
            />
            <Text style={texts.humidity}>{data.main.humidity}%</Text>
          </View>
          <View style={[styles.infoTempContainer]}>
            <Text style={texts.temp_max}>{data.main.temp_max}º</Text>
            <Text style={texts.temp_min}>{data.main.temp_min}º</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const cities = [
  'Lisboa',
  'Madrid',
  'Paris',
  'Berlim',
  'Copenhaga',
  'Roma',
  'Londres',
  'Dublin',
  'Praga',
  'Viena',
];
export interface resultType {
  name: string;
  country: string;
  lat: number;
  lon: number;
  weather: {
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: string;
    sunset: string;
  };
}

export default function List(): JSX.Element {
  const {t} = useTranslation();
  const [results, setResults] = React.useState<resultType[]>([]);

  const fetchData = async (city: string) => {
    try {
      var coordinates = await getCoordinatesFromApi(t, city);
      var weather = await getWeatherFromApi(
        t,
        coordinates.lat,
        coordinates.lon,
      );

      setResults(prev => [...prev, {...coordinates, ...weather}]);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    //todo cancel fetch request on the return of the use effect
    cities.forEach(city => fetchData(city));
    return () => {
      setResults([]);
    };
  }, []);

  return (
    <FlatList
      data={results}
      ItemSeparatorComponent={() => <View style={{height: 20}} />}
      renderItem={({item}) => <Region data={item} />}
      keyExtractor={item => item.name}
    />
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '80%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: '#FFFAFF',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTempLocalContainer: {
    flex: 0.7,
  },
  tempContainer: {},
  localContainer: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionIconContainer: {
    flex: 0.15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionInfoContainer: {
    flex: 0.25,
    justifyContent: 'center',
  },
  infoTempContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  humidityContainer: {
    backgroundColor: '#FC9E4F',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const texts = StyleSheet.create({
  temperature: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E1B18',
  },
  humidity: {},
  temp_max: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4D6DA8',
  },
  temp_min: {
    fontSize: 12,
    fontWeight: '400',
    color: '#405B8C',
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
  },
  local: {
    fontSize: 11,
    fontWeight: '500',
  },
});
