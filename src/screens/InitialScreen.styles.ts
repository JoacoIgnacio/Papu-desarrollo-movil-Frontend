import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',  
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 40,  
    resizeMode: 'contain',  
  },
  menuButton: {
    backgroundColor: '#FF497C',  
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,  
    alignItems: 'center',  
  },
  menuButtonText: {
    color: '#FFF',  
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSection: {
    backgroundColor: '#333',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 30,
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroButton: {
    backgroundColor: '#FF497C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quoteSection: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  eventsSection: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitleUnderline: {
    width: 50,
    height: 3,
    backgroundColor: '#FF497C',
    marginBottom: 20,
  },
  eventsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  card: {
    width: '48%',  
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,  // Sombra ligera
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,  
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 15,
  },
  learnMoreButton: {
    backgroundColor: '#FF497C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  learnMoreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exploreSection: {
    height: 400,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,  
  },
  exploreBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',  
  },
  exploreContent: {
    zIndex: 1,  
    alignItems: 'flex-end',  
    paddingRight: 30,  
  },
  exploreTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'right',
  },
  exploreUnderline: {
    width: 50,
    height: 3,
    backgroundColor: '#FF497C',
    marginVertical: 10,
  },
  exploreDescription: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'right',
    maxWidth: 400,  
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#FF497C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toursSection: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toursText: {
    width: '45%',
  },
  toursTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  toursTitleUnderline: {
    width: 50,
    height: 3,
    backgroundColor: '#FF497C',
    marginBottom: 20,
  },
  toursDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  toursImages: {
    width: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toursImage: {
    width: '48%',  
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
});
