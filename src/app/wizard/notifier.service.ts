import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { OperationType, Status, Step } from "./gcp.types";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class NotifierService {
  service: any;
  onSessionExpired: Subject<boolean>;

  constructor(public snackBar: MatSnackBar) {
    this.onSessionExpired = new Subject();
  }

  registerService(service: any) {
    this.service = service;
    return this;
  }

  notify(
    operationType: OperationType,
    isWorking: boolean,
    isValid: boolean,
    error: Status = null,
    description: string = null,
    duration: number = 0
  ): boolean {

    let snackBar = null;
    if (operationType !== null) {
      this.service.operationSteps[operationType].isDirty = true;
      this.service.operationSteps[operationType].isWorking = isWorking;
      this.service.operationSteps[operationType].isValid = isValid;


      if (isValid) {
        this.service.operationSteps[operationType].description = this.service.operationSteps[
          operationType
        ].description_2;
      }

      if (description) {
        this.service.operationSteps[operationType].description = description;
      }

    }


    if (error) {

      if (operationType !== null) {
        this.service.operationSteps[operationType].error = error.status || "ERROR";
      }

      if (error) {

        if (error.status && error.status.indexOf("ALREADY_EXISTS") !== -1) {
          // @todo: should we skip resources that already exist?

          // if (operationType !== null) {
          //   this.service.operationSteps[operationType].isSkipped = true;
          //   this.service.operationSteps[operationType].error = "";
          // }

          return false;

        }
        else if (
          (error.code === 401 ||
            (error.status && error.status.indexOf("UNAUTHENTICATED") !== -1))
        ) {
          // handle the session expired case if code=401 or status=[UNAUTHENTICATED]

          snackBar = this.snackBar.open(
            "Session expired. You need to link your account again.",
            "CLOSE",
            {
              duration
            }
          );
          this.service.onSessionExpired.next(true);

        } else {
          snackBar = this.snackBar.open(error.message, "CLOSE", {
            duration
          });
        }

      }

    } else {

      if (operationType !== null) {
        this.service.operationSteps[operationType].error = "";
      }

      if (snackBar) {
        snackBar.afterDismissed().subscribe(() => {
          this.service.resetOperations();
        });
      }

    }
  }
}
