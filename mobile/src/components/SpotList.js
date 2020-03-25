import React, { useState, useEffect } from 'react';
import { withNavigation} from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
            //console.log(responde.data);
        }
        loadSpots();
    }, []);

    //função quando usuário clicar no botão, vai receber o id do spot que o usuário clicou
    function handleNavigate(id) {
        //vai navegar o usuário para a tela book
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                //keyExtractor recebe uma função que vai receber cada item dos spots, e deve devolver qual informação desse spot é única, que é o id
                horizontal
                showsHorizontalScrollIndicator={false}
                //não mostra a barra de rolagem enquanto o usuário está mexendo
                renderItem={({ item }) => (
                    //retornar um jsx
                    //como cada um dos itens vai renderizar:
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url}} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
                //como deve se comportar para mostrar cada um dos spots(item)
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold:{
        fontWeight: 'bold',
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop:5
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default withNavigation(SpotList);