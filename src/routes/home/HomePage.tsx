import React from 'react'
import { BasePropsPage } from "../../submodules/base-props/base-props";
import Banner from '../../components/banner/Banner';
import PageLayout from '../../components/layout/page-layout/PageLayout';
import combineClassnames from '../../submodules/string-processing/combine-classname';
import Footer from '../../components/footer/Footer';
import ErrorBoundary from '../../components/flow-control/error-boundary/ErrorBoundary';
import Switch from '../../components/flow-control/switch/Switch';
import Match from '../../components/flow-control/switch/Match';

interface Props extends BasePropsPage {}

const HomePage = React.memo((props: Props) => {

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

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
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