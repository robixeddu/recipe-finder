import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Chip, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Recipe } from "../types";
import { fetchRecipeById, fetchRecipeRandom } from "../services/api";
import FavoriteButton from "src/components/FavoriteButton/FavoriteButton";
import { useFavorites } from "src/hooks/useFavorites";
import Loader from "src/components/Loader/Loader";
import PageTitle from "src/components/PageTitle/PageTitle";
import theme from "src/theme/theme";
import { getIngredients } from "src/utils/getIngredients";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipeRandom, setRecipeRandom] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchRecipeById(id!);
        setRecipe(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  useEffect(() => {
    const fetchRecipeBottom = async () => {
      try {
        setLoadingRandom(true);
        const data = await fetchRecipeRandom();
        setRecipeRandom(data);
      } catch (err) {
        console.error("Failed to load random recipe:", err);
        // Don't set main error state, this is optional content
      } finally {
        setLoadingRandom(false);
      }
    };

    fetchRecipeBottom();
  }, [id]);

  if (error) {
    return (
      <Container sx={{ mt: 4, mb: 4 }} component="section" role="alert">
        <Typography variant="h5" component="h1" color="error" gutterBottom>
          Errore
        </Typography>

        <Typography component={"p"}>{error}</Typography>

        <Button component={RouterLink} to="/" variant="outlined" sx={{ mt: 4 }}>
          Torna alla home
        </Button>
      </Container>
    );
  }

  if (loading || loadingRandom) return <Loader />;

  const ingredients = recipe ? getIngredients(recipe) : [];

  return (
    <main>
      {recipe && (
        <>
          <Container sx={{ mt: 4 }}>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12 }}>
                <PageTitle title={recipe.strMeal} />
              </Grid>

              <Grid
                size={{ xs: 12, md: 5 }}
                sx={{
                  marginRight: { md: "20px" },
                  position: { xs: "relative", md: "sticky" },
                  top: { md: 100 },
                  alignSelf: { md: "start" },
                }}
              >
                <img
                  src={recipe?.strMealThumb}
                  alt={`Foto della ricetta ${recipe.strMeal}`}
                  loading="eager"
                  style={{
                    aspectRatio: 1,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <FavoriteButton
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.idMeal)}
                  onToggleFavorite={toggle}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <section
                  aria-labelledby="ingredients-title"
                  style={{
                    marginBottom: 30,
                    border: `2px solid ${theme.palette.primary.main}`,
                    display: "inline-block",
                    borderRadius: "10px",
                    padding: "20px 30px 10px 30px",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    id="ingredients-title"
                    gutterBottom
                  >
                    Ingredienti
                  </Typography>

                  <Box component="ul" sx={{ pl: 3 }}>
                    {ingredients.map((ingredient) => (
                      <li key={ingredient.name}>
                        <Typography component="span">
                          {ingredient.measure} {ingredient.name}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                </section>

                <section
                  aria-labelledby="info-title"
                  style={{ marginBottom: 30 }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    id="info-title"
                    gutterBottom
                  >
                    Informazioni
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Chip label={`Categoria: ${recipe.strCategory}`} />
                    <Chip label={`Area: ${recipe.strArea}`} />
                  </Box>
                </section>

                <section aria-labelledby="instructions-title" style={{ marginBottom: 30 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    id="instructions-title"
                    gutterBottom
                  >
                    Istruzioni
                  </Typography>

                  <Typography component="p" sx={{ whiteSpace: "pre-line" }}>
                    {recipe.strInstructions}
                  </Typography>
                </section>

                <section aria-labelledby="random-recipe-title">
                  <Typography
                    variant="h5"
                    component="h2"
                    id="random-recipe-title"
                    gutterBottom
                  >
                    Random Recipe
                  </Typography>

                  <RouterLink to={`/recipe/${recipeRandom?.idMeal}`} style={{ textDecoration: "underline" }}>
                    {recipeRandom?.strMeal}
                  </RouterLink>
                </section>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </main>
  );
};

export default RecipeDetailPage;
