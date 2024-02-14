/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useCallback } from 'react';
import Prendas from '../../../utils/img/Prendas/index';

import { Avatar, Group, Select, Text } from '@mantine/core';
import { forwardRef, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const {
  Toalla,
  Abrigo,
  Almohada,
  Camisa,
  Casaca,
  Cobertor,
  Cortinas,
  Cubrecama,
  Otro,
  Frazada,
  Jean,
  Manta,
  Pantalon,
  Polo,
  Saco,
  SacoLargo,
  Tapete,
  Zapatillas,
  Edredon,
  // Peluche,
  Hamaca,
  CubreColchon,
  Funda,
  LavadoMano,
  Sabanas,
  Planchado,
  Gancho,
  Lavar,
  Secar,
  VestidoLargo,
  Terno,
} = Prendas;

const SelectItem = forwardRef(({ image, label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap={true}>
      <Avatar src={image} />
      <div>
        <Text>{label}</Text>
      </div>
    </Group>
  </div>
));

const InputSelectedPrenda = ({ listenClick, tabI, disabled }) => {
  const infoProductos = useSelector((state) => state.prenda.infoPrendas);
  const [data, setData] = useState([]);
  const [defaultValue, setDefaultValue] = useState(null);

  const getPricePrenda = useCallback((productos, nombre) => {
    const product = productos.find((producto) => producto.name.toLowerCase() === nombre.toLowerCase());

    if (product) {
      return product.price;
    }

    return 0;
  }, []);

  useEffect(() => {
    const productosDB = infoProductos;
    // Producto - precio - stado
    const info = [
      {
        image: Toalla,
        label: 'Toalla',
        value: ['Toalla', getPricePrenda(productosDB, 'Toalla'), false],
      },
      {
        image: Casaca,
        label: 'Chamarra',
        value: ['Chamarra', getPricePrenda(productosDB, 'Chamarra'), false],
      },
      {
        image: Zapatillas,
        label: 'Tenis',
        value: ['Tenis', getPricePrenda(productosDB, 'Tenis'), false],
      },
      {
        image: LavadoMano,
        label: 'Desmanchado a Mano',
        value: ['Desmanchado a Mano', getPricePrenda(productosDB, 'Desmanchado a Mano'), false],
      },
      {
        image: Edredon,
        label: 'Edredon Matrimonial',
        value: ['Edredon Matrimonial', getPricePrenda(productosDB, 'Edredon Matrimonial'), false],
      },
      {
        image: Edredon,
        label: 'Edredon Queen',
        value: ['Edredon Queen', getPricePrenda(productosDB, 'Edredon Queen'), false],
      },
      {
        image: Cobertor,
        label: 'Cobertor Ind',
        value: ['Cobertor Ind', getPricePrenda(productosDB, 'Cobertor Ind'), false],
      },
      {
        image: Cobertor,
        label: 'Cobertor Mat',
        value: ['Cobertor Mat', getPricePrenda(productosDB, 'Cobertor Mat'), false],
      },
      {
        image: Cobertor,
        label: 'Cobertor Queen',
        value: ['Cobertor Queen', getPricePrenda(productosDB, 'Cobertor Queen'), false],
      },
      {
        image: Cobertor,
        label: 'Cobertor King',
        value: ['Cobertor King', getPricePrenda(productosDB, 'Cobertor King'), false],
      },
      {
        image: Planchado,
        label: 'Planchado por Docena',
        value: ['Planchado por Docena', getPricePrenda(productosDB, 'Planchado por Docena'), false],
      },
      {
        image: Planchado,
        label: 'Planchado por Pieza',
        value: ['Planchado por Pieza', getPricePrenda(productosDB, 'Planchado por Pieza'), false],
      },
      {
        image: Gancho,
        label: 'Gancho Metalico',
        value: ['Gancho Metalico', getPricePrenda(productosDB, 'Gancho Metalico'), false],
      },
      {
        image: Edredon,
        label: 'Edredon de Pluma/Grueso',
        value: ['Edredon de Pluma/Grueso', getPricePrenda(productosDB, 'Edredon de Pluma/Grueso'), false],
      },
      // {
      //   image: Lavar,
      //   label: 'Lavado 10kg',
      //   value: ['Lavado 10kg', getPricePrenda(productosDB, 'Lavado 10kg'), false],
      // },
      // {
      //   image: Secar,
      //   label: 'Secado 10kg',
      //   value: ['Secado 10kg', getPricePrenda(productosDB, 'Secado 10kg'), false],
      // },
      {
        image: Lavar,
        label: 'Lavado 18kg',
        value: ['Lavado 18kg', getPricePrenda(productosDB, 'Lavado 18kg'), false],
      },
      {
        image: Secar,
        label: 'Secado 18kg',
        value: ['Secado 18kg', getPricePrenda(productosDB, 'Secado 18kg'), false],
      },
      {
        image: VestidoLargo,
        label: 'Vestido Largos',
        value: ['Vestido Largos', getPricePrenda(productosDB, 'Vestido Largos'), false],
      },
      {
        image: Terno,
        label: 'Trajes de 2 Piezas',
        value: ['Trajes de 2 Piezas', getPricePrenda(productosDB, 'Trajes de 2 Piezas'), false],
      },
      {
        image: Hamaca,
        label: 'Hamaca',
        value: ['Hamaca', getPricePrenda(productosDB, 'Hamaca'), false],
      },
      {
        image: Sabanas,
        label: 'Sabanas',
        value: ['Sabanas', getPricePrenda(productosDB, 'Sabanas'), false],
      },
      {
        image: Funda,
        label: 'Funda',
        value: ['Funda', getPricePrenda(productosDB, 'Funda'), false],
      },
      {
        image: CubreColchon,
        label: 'Cubre colchon',
        value: ['Cubre colchon', getPricePrenda(productosDB, 'Cubre colchon'), false],
      },
      // {
      //   image: Peluche,
      //   label: 'Peluche',
      //   value: ['Peluche', getPricePrenda(productosDB, 'Peluche'), false],
      // },
      {
        image: Polo,
        label: 'Playera',
        value: ['Playera', getPricePrenda(productosDB, 'Playera'), false],
      },
      {
        image: Camisa,
        label: 'Camisa',
        value: ['Camisa', getPricePrenda(productosDB, 'Camisa'), false],
      },
      {
        image: Pantalon,
        label: 'Pantalon',
        value: ['Pantalon', getPricePrenda(productosDB, 'Pantalon'), false],
      },
      {
        image: Cubrecama,
        label: 'Sobrecama',
        value: ['Sobrecama', getPricePrenda(productosDB, 'Sobrecama'), false],
      },
      {
        image: Manta,
        label: 'Manta',
        value: ['Manta', getPricePrenda(productosDB, 'Manta'), false],
      },
      {
        image: Saco,
        label: 'Saco corto',
        value: ['Saco corto', getPricePrenda(productosDB, 'Saco corto'), false],
      },
      {
        image: SacoLargo,
        label: 'Saco largo',
        value: ['Saco largo', getPricePrenda(productosDB, 'Saco largo'), false],
      },
      {
        image: Abrigo,
        label: 'Gabardina',
        value: ['Gabardina', getPricePrenda(productosDB, 'Gabardina'), false],
      },

      {
        image: Jean,
        label: 'Jean',
        value: ['Jean', getPricePrenda(productosDB, 'Jean'), false],
      },
      {
        image: Almohada,
        label: 'Almohada',
        value: ['Almohada', getPricePrenda(productosDB, 'Almohada'), false],
      },
      {
        image: Frazada,
        label: 'Frazada',
        value: ['Frazada', getPricePrenda(productosDB, 'Frazada'), false],
      },
      // {
      //   image: Edredon,
      //   label: 'Edredon',
      //   value: ['Edredon', getPricePrenda(productosDB, 'Edredon'), false],
      // },
      {
        image: Cobertor,
        label: 'Cobertor',
        value: ['Cobertor', getPricePrenda(productosDB, 'Cobertor'), false],
      },
      {
        image: Cortinas,
        label: 'Cortinas',
        value: ['Cortinas', getPricePrenda(productosDB, 'Cortinas'), false],
      },
      {
        image: Tapete,
        label: 'Tapete',
        value: ['Tapete', getPricePrenda(productosDB, 'Tapete'), false],
      },
      {
        image: Planchado,
        label: 'Planchado',
        value: ['Planchado', getPricePrenda(productosDB, 'Planchado'), false],
      },
      {
        image: Otro,
        label: 'Otros',
        value: ['Otros', '', false], // Producto - precio - stado - Categoria
      },
    ];

    setData(info);
  }, [infoProductos]);

  return (
    <Select
      label="Escoga Prenda :"
      placeholder="Escoga para agregar"
      itemComponent={SelectItem}
      data={data}
      value={defaultValue}
      size="lg"
      searchable={true}
      tabIndex={tabI}
      disabled={disabled}
      dropdownPosition="bottom"
      maxDropdownHeight={270}
      nothingFound="No encontrado"
      filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      hoverOnSearchChange={true}
      onChange={(value) => {
        listenClick(value[0], value[1], value[2]);
        setDefaultValue(null);
      }}
    />
  );
};

export default InputSelectedPrenda;
