import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../navigation/rootStackNavigation';
import { styles } from './InitialScreen.styles'; 

const { width } = Dimensions.get('window');

const InitialScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  //Parametros para la pantalla de carga
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  //Accion de la carga como tal
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Barra de navegación */}
      <View style={styles.navBar}>
        {/* Logo a la izquierda */}
        <Image
          source={{ uri: './assets/images/icon1.png' }} 
          style={styles.logo}  
        />

        {/* Botón "Iniciar Sesión" a la derecha */}
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.menuButtonText}>INICIAR SESION</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Héroe */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Explore the Colourful World</Text>
        <Text style={styles.heroSubtitle}>A Wonderful Gift</Text>
        <TouchableOpacity style={styles.heroButton}>
          <Text style={styles.heroButtonText}>LEARN MORE</Text>
        </TouchableOpacity>
      </View>

      {/* Cita central */}
      <View style={styles.quoteSection}>
        <Text style={styles.quoteText}>
          "Fuerat aestu carentem habentia spectent tonitrua mutastis locavit liberioris."
        </Text>
        <Text style={styles.quoteAuthor}>- Adam Sender</Text>
      </View>

      {/* Sección de "Upcoming Events" */}
      <View style={styles.eventsSection}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.sectionTitleUnderline}></View>
        <View style={styles.eventsRow}>
          <View style={styles.card}>
            <Image
              source={{ uri: './assets/images/beach.jpg'}} // Imagen de ejemplo
              style={styles.image}
            />
            <Text style={styles.title}>Everest Camp Trek</Text>
            <Text style={styles.description}>
              Fuerat aestu carentem habentia spectent tonitrua mutastis locavit liberioris inistra possedit.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>↠ LEARN MORE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Image
              source={{ uri: './assets/images/beach.jpg' }} 
              style={styles.image}
            />
            <Text style={styles.title}>Walking Holidays</Text>
            <Text style={styles.description}>
              Fuerat aestu carentem habentia spectent tonitrua mutastis locavit liberioris inistra possedit.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>↠ LEARN MORE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sección "Explore The World" */}
      <View style={styles.exploreSection}>
        <Image
          source={{ uri: './assets/images/fog.jpg' }} 
          style={styles.exploreBackground}
        />
        <View style={styles.exploreContent}>
          <Text style={styles.exploreTitle}>Explore The World</Text>
          <View style={styles.exploreUnderline}></View>
          <Text style={styles.exploreDescription}>
            Diremit mundi mare undae nunc mixtam tanto sibi. Nubes unda concordi. Fert his. Recessit mentes praecipites locum caligine sui egenis erat. Silvas caeli regna.
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>↠ LEARN MORE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seccion "Upcoming Tours & Destination" */}
      <View style={styles.toursSection}>
        <View style={styles.toursText}>
          <Text style={styles.toursTitle}>Upcoming Tours & Destination</Text>
          <View style={styles.toursTitleUnderline}></View>
          <Text style={styles.toursDescription}>
            Fuerat aestu carentem habentia spectent tonitrua mutastis locavit liberioris. Sinistra possedit litora ut nabataeaque. Setucant coepyterunt perveniunt animal! Concordi aurea nabataeaeque seductaque constaque cepit sublime flexi nullus.
          </Text>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreButtonText}>LEARN MORE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.toursImages}>
          <Image
            source={{ uri: './assets/images/forest.jpg' }}
            style={styles.toursImage}
          />
          <Image
            source={{ uri: './assets/images/forest.jpg' }} 
            style={styles.toursImage}
          />
          <Image
            source={{ uri: './assets/images/forest.jpg' }} 
            style={styles.toursImage}
          />
          <Image
            source={{ uri: './assets/images/forest.jpg' }} 
            style={styles.toursImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default InitialScreen;
