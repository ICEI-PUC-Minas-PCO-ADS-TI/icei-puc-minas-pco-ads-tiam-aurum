// src/components/ClientCard.tsx

import React, { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MESANGEM_SEM_INFORMACAO } from '../constantes/ObjectConstants';
import { ClienteDTO } from '../interfaces/interfaces';

// Habilita a LayoutAnimation no Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface ClientCardProps {
  client: ClienteDTO;
  onEdit: (id: number) => void;
  onDelete: (id: number | undefined) => void;
  onViewDetails: (id: number | undefined) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onEdit, onDelete, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const handleMenuAction = (action: () => void) => {
    action();
    setMenuVisible(false);
  };

  const renderCollapsedView = () => (
    <View style={styles.row}>
      <Image
        source={require('../assets/usuario.jpeg')} // Uma imagem default pequena
        style={styles.avatarSmall}
      />
      <Text style={styles.clientNameCollapsed}>{client.nome}</Text>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
        <Icon name="dots-vertical" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );

  const renderExpandedView = () => (
    <View style={styles.expandedContainer}>
      <View style={styles.leftBlock}>
        <Image
          source={require('../assets/usuario.jpeg')}
          style={styles.avatarLarge}
        />
      </View>
      <View style={styles.rightBlock}>
        <Text style={styles.clientNameExpanded}>{client.nome}</Text>
        <View style={styles.infoRow}>
          <Icon name="email-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{client.email != null ? client.email : MESANGEM_SEM_INFORMACAO}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{client.telefone != null ? client.telefone : MESANGEM_SEM_INFORMACAO}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="map-marker-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{client.cidade != null ? client.cidade : MESANGEM_SEM_INFORMACAO}</Text>
        </View>
        <View style={styles.infoRowIcons}>
          <Ionicon name="person" size={16} color="green" />
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction(() => onViewDetails(client.id))}>
            <Text style={{ color: 'green' }}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRowIcons}>
          <Ionicon name="trash-outline" size={16} color="red" />
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction(() => onDelete(client.id))}>
            <Text style={{ color: 'red' }}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        {isExpanded ? renderExpandedView() : renderCollapsedView()}
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isMenuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction(() => onViewDetails(client.id))}>
                <Text>Ver Detalhes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction(() => onDelete(client.id))}>
                <Text style={{ color: 'red' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden', // Importante para a animação
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  clientNameCollapsed: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 8,
  },
  // Estilos da visão expandida
  expandedContainer: {
    flexDirection: 'row',
  },
  leftBlock: {
    marginRight: 16,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  rightBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  clientNameExpanded: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  // Estilos do Modal/Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginTop: 50, // Ajuste conforme a posição do seu header
    marginRight: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  infoRowIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ClientCard;