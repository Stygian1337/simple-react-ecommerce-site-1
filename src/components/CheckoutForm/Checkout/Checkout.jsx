import React, { useState , useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";

import { commerce } from '../../../lib/commerce';
import useStyles from "./styles";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
const steps = ["Shipping address", "Payment details"];

const Checkout = ( { cart } ) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

        console.log("token is: ",token);

        setCheckoutToken(token);

      } catch (error) {
        console.log("Cart Token Generation Failure. Error: ",error);
      }
    }
    generateToken();
  }, [cart]);
  

  const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1 )
  const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1 )

  const next = ( data ) => {
    setShippingData(data)
    console.log("I am executed!")
    nextStep();
  }

  const Confirmation = () => (
    <div>
        Confirmation
    </div>
  )

  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backstep={backStep}/>

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" alighn="center">
            Checkout
          </Typography>
          <Stepper activeStep={0} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
