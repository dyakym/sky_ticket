import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import type { RootState } from "../../store/rootReducer";
import { clearPurchased, removePurchased } from "../../store/actions";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const Cart = () => {
  const purchased = useSelector((state: RootState) => state.purchased.items);
  const dispatch = useDispatch();

  const totalPrice = purchased.reduce(
    (sum, item) => sum + item.flight.price,
    0
  );

  const handleRemove = (flightId: string, seatId: string) => {
    dispatch(removePurchased(flightId, seatId));
  };

  const handlePurchase = () => {
    localStorage.removeItem("purchased");
    dispatch(clearPurchased());
  };

  if (!purchased) return <div>eror</div>;

  return (
    <div className="h-full min-h-screen bg-gradient-to-t from-cyan-500 to-blue-500">
      <Header />
      <div className="p-10 mx-auto max-w-[1200px]">
        <div className="text-white">
          <h3 className="mb-5 text-center text-3xl border-b pb-4">Корзина</h3>

          {purchased.length === 0 ? (
            <div className="text-center text-xl mb-5">
              Нажаль, корзина пуста.
            </div>
          ) : (
            <>
              <div className="hidden xl:inline-block">
                <div className="grid grid-cols-11 gap-4 font-bold mb-4 px-4">
                  <div className="flex justify-center items-center text-center">
                    ID
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Авіакомпанія
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Звідки
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Куди
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Відправлення
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Прибуття
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Термінал
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Ворота
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Місце
                  </div>
                  <div className="flex justify-center items-center text-center">
                    Ціна
                  </div>
                  <div></div>
                </div>
                {purchased.map((e) => (
                  <div
                    key={e.flight.id + e.seatId}
                    className="grid grid-cols-11 gap-4 my-10 border rounded p-4"
                  >
                    <div className="flex justify-center items-center text-center">
                      {e.flight.id}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {e.flight.airline}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {e.flight.from}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {e.flight.to}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {new Date(e.flight.departureTime).toLocaleString()}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {new Date(e.flight.arrivalTime).toLocaleString()}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {e.flight.terminal}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {e.flight.gate}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {e.seatId}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      {e.flight.price}
                    </div>
                    <div className="flex justify-center items-center text-center">
                      <IconButton
                        onClick={() => handleRemove(e.flight.id, e.seatId)}
                        color="error"
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-9 xl:hidden">
                {purchased.map((e) => (
                  <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Рейс: {e.flight.id}
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary">
                        Авіакомпанія: {e.flight.airline}
                      </Typography>

                      <Typography variant="body2">
                        Напрямок: {e.flight.from} → {e.flight?.to}
                      </Typography>

                      <Typography variant="body2">
                        Час відправлення:
                        {new Date(e.flight.departureTime).toLocaleString()}
                      </Typography>

                      <Typography variant="body2">
                        Час прибуття:
                        {new Date(e.flight.arrivalTime).toLocaleString()}
                      </Typography>

                      <Typography variant="body2">
                        Ціна: {e.flight.price}$
                      </Typography>

                      <Typography variant="body2">
                        Термінал: {e.flight.terminal}
                      </Typography>

                      <Typography variant="body2">
                        Ворота: {e.flight.gate}
                      </Typography>

                      <Typography variant="h4" align="center">
                        Місце: {e.seatId}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <Button
                          onClick={() => handleRemove(e.flight.id, e.seatId)}
                          variant="contained"
                          color="error"
                        >
                          Видалити
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between items-center max-xl:flex-col max-xl:gap-5 mt-7">
                <div className="sm:text-xl font-bold text-white">
                  Загальна сума: {totalPrice}$
                </div>

                <Button
                  onClick={handlePurchase}
                  variant="contained"
                  color="success"
                  sx={{
                    "&:hover": {
                      backgroundColor: "green.700",
                    },
                  }}
                >
                  Придбати
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
