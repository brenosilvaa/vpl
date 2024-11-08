import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useListBrands from "../../hooks/brand/use-list-brands";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import { Brand } from "../../models/brand";
import BrandCard from "./brand-card";
import SEO from "../../components/seo";
import styles from "./brands-page.module.scss"

const BrandsPage = () => {
    const [brandsResult, setBrandsResult] = useState<ApiResult>(ApiResult.start());

    const listBrands = useListBrands();

    const fetchData = async () => {
        setBrandsResult(await listBrands());
    };

    useEffect(() => {
        if (brandsResult.status === ApiResultStatus.loading)
            fetchData();
    });

    return (
        <>
            <SEO title="Marcas"
                description="Confira a relação de marcas que controlamos o valor de mercado"
                keywords="ford, volkswagen, chevrolet, carro" />

            <Typography variant="h1" component="h1">Marcas</Typography>
            <Typography variant="h6" component="p">
                Encontre a marca do seu novo veículo,
                <br />
                clique sobre ela para ver todos os modelos disponíveis.
            </Typography>

            {brandsResult.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {brandsResult.status === ApiResultStatus.error && <p>Erro: {brandsResult.errorMessage}</p>}

            {brandsResult.status === ApiResultStatus.success &&
                <Grid container spacing={1} sx={{ my: 3 }} className={styles['bg-color']}>
                    {brandsResult.data.map((brand: Brand) => (
                        <Grid item key={brand.id} xs={12} lg={6}>
                            <BrandCard {...brand} />
                        </Grid>
                    ))}
                </Grid>
            }
        </>
    );
};

export default BrandsPage;