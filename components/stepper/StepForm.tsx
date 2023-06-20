import {
  Container,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";

type StepFormProps = {
  activeStep: number;
  steps: { form: ReactElement; name: string }[];
};

const StepForm: React.FC<StepFormProps> = ({ activeStep, steps }) => {
  return (
    <Container mb={8} mt={8}>
      <Stepper index={activeStep}>
        {steps.map((_, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default StepForm;
