import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { itemsState } from "store/productstore/productReducer";
import { RootState } from "store/store";
import EditProduct from "../components/editProduct";
import AddProduct from "../components/addproduct";
import { useRouter } from "next/router";
import { Form, Get, Update } from "store/productstore/productAction";

export type images = {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
};
export type item = {
  productName: string;
  price: string;
  productImage: string[];
  Description: string;
  id: number;
};
export type form = { add: true; isEdit: false };
function Productform() {
  const { Items, Forms }: itemsState = useSelector(
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
    dispatch(
      Form({
        add: false,
        isEdit: false,
        Current: null,
      })
    );
  };

  const updateEmployee = (id: number, updatedpdtObj: any, mul: string[]) => {
    router.push("/");
    dispatch(
      Form({
        add: null,
        isEdit: false,
        Current: {
          productName: updatedpdtObj.productName,
          price: updatedpdtObj.price,
          productImage: updatedpdtObj.productImage,
          Description: updatedpdtObj.Description,
          id: updatedpdtObj.id,
        },
      })
    );
    dispatch(Update(Items.map((pdt) => (pdt.id === id ? updatedpdtObj : pdt))));
  };

  return (
    <div>
      {Forms.isEdit ? (
        <EditProduct updateEmployee={updateEmployee} />
      ) : (
        <AddProduct addProduct={addProduct} />
      )}
    </div>
  );
}

export default Productform;
