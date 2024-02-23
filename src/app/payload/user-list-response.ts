import { Designation } from "../entites/designation";

export class UserListResponse {

      id=0;

	  firstName='';

	  lastName='';

	  email='';

	  originalName="profileImage";

	
	  profileName ="defaultUserImage.png";
	

	  designation!:Designation;
	  dob='';

	  jobTitle='';
	  phone='';
	// colum text
	  address='';

	  alternativePhone='';

}
