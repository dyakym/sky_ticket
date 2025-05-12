import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";

export default function Header() {
  const purchasedLength = useSelector(
    (state: RootState) => state.purchased.items.length
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Flights
          </Typography>

          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={purchasedLength} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
