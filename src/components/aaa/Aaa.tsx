import "./Aaa.scss";
import { useState, useEffect, useRef } from "react";
import { Step2 } from "./Step2";
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
export const Aaa = ({
  step2,
  step3,
  step4,
  step5,
  setStep2,
  setStep3,
  setStep4,
  setStep5,
}: any) => {
  const [totals, setTotals] = useState<Object[]>([]);

  const dispatch = useAppDispatch();
  const { orders }: any = useAppSelector((state) => state.orders);
  // console.log(orders);

  const [input, setInput] = useState([0]);
  const inputRef = useRef(null);
  const reff = inputRef.current;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  useEffect(() => {
    saveItput();
  }, [reff]);

  let arr1 = orders?.map((item: any) => item.table_name);
  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }
  const headArr = removeDuplicates(arr1);

  function addOrder1(id: number, table: string, col: string, e: any) {
    const newTotals = totals.filter((item: any) => item.columnName !== col);
    setTotals([
      ...newTotals,
      {
        id: id,
        tableName: table,
        columnName: col,
        value: e,
      },
    ]);
  }

  let arrr: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[0]) {
      arrr.push(el);
    }
  });

  function saveItput() {
    totals.map((el: any, idx: number) => {
      if (el.value === "") {
        setInput(input.slice(0, idx + 1));
      }
    });
  }
  console.log(totals);

  return (
    <div>
      {step2 ? (
        <Step2
          step3={step3}
          step4={step4}
          step5={step5}
          setStep3={setStep3}
          setStep4={setStep4}
          setStep5={setStep5}
          totals={totals}
          setTotals={setTotals}
          orders={orders}
        />
      ) : (
        <div className="Aaa">
          <div  >
            {
              <div key={headArr[0]}>
                <h2>{headArr[0]}</h2>
                {arrr.map(
                  (item: any, index: number) =>
                    input.includes(index) && (
                      <div key={item.id}>
                        <label>{item.column_name}</label>
                        <input
                          type="text"
                          onChange={(e: any) => {
                            addOrder1(
                              item.id,
                              item.table_name,
                              item.column_name,
                              e.target.value
                            );

                            setTimeout(() => {
                              if (!input.includes(index + 1)) {
                                setInput([...input, index + 1]);
                              }
                            }, 100);
                          }}
                        />
                      </div>
                    )
                )}
              </div>
            }
          </div>
          {totals.length == arrr.length && (
            <button onClick={() => setStep2(true)}>save</button>
          )}
        </div>
      )}
    </div>
  );
};
