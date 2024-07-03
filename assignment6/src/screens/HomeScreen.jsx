import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  {
    id: '1',
    name: 'Office Wear',
    description: 'Reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress1.png'),
  },
  {
    id: '2',
    name: 'Black',
    description: 'Reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress2.png'),
  },
  {
    id: '3',
    name: 'Church Wear',
    description: 'Reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress3.png'),
  },
  {
    id: '4',
    name: 'Lamerei',
    description: 'Reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress4.png'),
  },
  {
    id: '5',
    name: '21WN',
    description: 'Reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress5.png'),
  },
  {
    id: '6',
    name: 'Lopo',
    description: 'Reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress6.png'),
  }
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    getCart();
  }, []);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OUR STORY</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  product: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  cartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
