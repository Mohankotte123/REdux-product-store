import React, { useEffect,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { itemsState } from "store/productstore/productReducer";
import { RootState } from "store/store";
import ProductForm from "components/Product-Form";
import { useRouter } from "next/router";
import { Form, Get, Update } from "store/productstore/productAction";


export type item = {
  productName: string;
  price: string;
  productImage: string[];
  Description: string;
  id: number;
};
export type form = { add: true; isEdit: false };
function Productform() {
  const { Items }: itemsState = useSelector(
    (state: RootState) => state.products
  );

  const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
  const router = useRouter();
  useEffect(() => {
    if (Items == null) {
      dispatch(Get());
    }
  }, []);

  const addProduct = (Item: item) => {
    let toBeUpdated: item[] = [...JSON.parse(JSON.stringify(Items)), Item];
    dispatch(Update(toBeUpdated));
    dispatch(Form(null));
  };
  const updateEmployee = (id: number, updatedpdtObj: any, mul: string[]) => {
    router.push("/");
    dispatch(Update(Items.map((pdt) => (pdt.id === id ? updatedpdtObj : pdt))));
    dispatch(
      Form({
        Current: {
          productName: updatedpdtObj.productName,
          price: updatedpdtObj.price,
          productImage: updatedpdtObj.productImage,
          Description: updatedpdtObj.Description,
          id: updatedpdtObj.id,
        },
      })
    );
  };
  return (
    <div>
      <ProductForm addProduct={addProduct} updateEmployee={updateEmployee} />
    </div>
  );
}

export default Productform;
