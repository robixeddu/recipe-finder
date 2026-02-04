import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import {
  fetchCountriesRecipes,
  fetchRecipesByTextSearch,
} from "../services/api";
import { useAboveTheFoldCount } from "../hooks/useAboveTheFold";
import { useFavorites } from "../hooks/useFavorites";
import { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Loader from "src/components/Loader/Loader";
import PageTitle from "src/components/PageTitle/PageTitle";

const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const aboveTheFoldCount = useAboveTheFoldCount();
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      const fetchContent =
        search.length > 0 ? fetchRecipesByTextSearch : fetchCountriesRecipes;

      fetchContent(search).then((res) => {
        setRecipes(res);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <Container sx={{ mt: 4 }}>
      <SearchBar value={search} onChange={setSearch} />

      {loading && <Loader />}

      {!search && !loading && <PageTitle title="Ricette dal mondo" />}

      {search && recipes.length === 0 && (
        <PageTitle title="Nessuna ricetta trovata" />
      )}

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {recipes.map((recipe, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={recipe.idMeal}>
            <RecipeCard
              recipe={recipe}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={toggle}
              isAboveTheFold={index < aboveTheFoldCount}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
