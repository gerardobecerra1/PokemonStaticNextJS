import { NextPage, GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

//title: Listado de Pokémons
const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      {/* <Image src="/img/banner.png" width={200} height={150}></Image> */}
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>;
        })}
      </Grid.Container>
    </Layout>
  );
};

//Usar getStaticProps siempre cuando sepamos que son los paraetros que el usuario necesita en este caso los 151 pokemons que cargamos
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(
    "/pokemon/?limit=151"
  );

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
