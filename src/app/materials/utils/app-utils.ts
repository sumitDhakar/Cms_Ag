export class AppUtils {

    public static modelDismiss(id:any){
        let element = document.getElementById(id);
        element?.click();
    }

    public static  formSubmittion(addForm:any) {
        Object.keys(addForm.controls).forEach((key) => {
          const control = addForm.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
         document.querySelector('input.ng-invalid');
      }
}
