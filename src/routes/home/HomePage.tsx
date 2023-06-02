import React, { useMemo, useState } from 'react'
import { BasePropsPage } from "../../submodules/base-props/base-props";
import Banner from '../../components/banner/Banner';
import PageLayout from '../../components/layout/page-layout/PageLayout';
import combineClassnames from '../../submodules/string-processing/combine-classname';
import Footer from '../../components/footer/Footer';
import ProductCard from '../../components/product/ProductCard';
import For from '../../components/flow-control/for/For';
import ProductLayout from '../../components/layout/product-layout/ProductLayout';
import { useRecoilValue } from 'recoil';
import { apiUrlSelector } from '../../states/system-states';
import useFetch from '../../hooks/useFetch';
import { productsGET } from '../../interfaces/api-formats/products';
import { shuffle } from '../../submodules/array-processing/shuffle';
import Switch from '../../components/flow-control/switch/Switch';
import Match from '../../components/flow-control/switch/Match';
import ErrorPrompt from '../../components/error/ErrorPrompt';
import ProductList from '../../components/product/ProductList';

interface Props extends BasePropsPage {}

const HomePage = React.memo((props: Props) => {
  const productsApiUrl = useRecoilValue(apiUrlSelector("products"));
  const productsRes = useFetch<productsGET[]>({
    url: productsApiUrl,
    method: "GET"
  }, []);

  const products = useMemo(() => {
    if (productsRes.data)
      return shuffle(productsRes.data);
    return undefined;
  }, [productsRes.data]);

  return (
    <PageLayout
      id={props.id}
      className={combineClassnames(
        props.className,
        "flex flex-col"
      )}
      style={{...props.style}}
    >      
      <Banner className="w-full max-h-[70vh] mb-14 overflow-hidden" />
      
      <ProductList 
        className="my-2"
        products={products} 
      />

      <Footer className="flex flex-col justify-between p-3 text-center text-sm font-thin">
        <h2 className="font-normal text-base font">MILANO SHOP</h2>
        <p className="italic">
          Địa chỉ: Võ Văn Ngân, p. Bình Thọ, TP. Thủ Đức, TP.HCM
          <br />
          Sđt: 0971260821
        </p>
        <p className="italic">
          Email: <a href="mailto:milanoshop@gmail.com">milanoshop@gmail.com</a>
        </p>
      </Footer>
    </PageLayout>
  );
});

export default HomePage;