import passport from "passport";
import passportLocal from "passport-local";
import User from "../models/User.js";
import {members} from "../models/Member.js";

// local login 정책을 수행하는 모듈
const LocalStratege = passportLocal.Strategy

const exportPassport = () => {

	// 로그인이 성공했을때 (내부에서) 호출되는 함수
	passport.serializeUser((user, done) =>{

		console.log("로그인 성공");
		done(null, user);
	});

	// 로그인이 정상적으로 수행된 후 client에서 세션이 유효한지
	//  문의가 들어왔을때 실행되는 함수
	passport.deserializeUser((user, done) => {

		console.log("DES", user);
		done(null, user);

	});

	// 로그인을 실제 수행하는 함수
	passport.use(

		new LocalStratege({

			// login을 수행할때 전달될 변수명 설정
			usernameField : "userid",
			passwordField : "password",

			// 세션 저장하기
			session : true

		}, 
		(userid, password, done) => {
			// Member.js에 선언된 사용자 리스트를 사용하여 인증하기

			// filter, map, forEach를 사용한 코드들이 하는 일은 모두 같으나
			// filter 사용했을 경우 findMember[0] 처럼 값을 하나만 가져오도록
			// 해야한다 안그러면 배열 전부를 불러오는 코드가 되어버린다

			/*filter를 이용한 방법 
			const findMember = members.filter(member => {
				return member.userid === userid && member.password === password;
			});
			if(findMember && findMember.length > 0) {
				return done(null, findMember[0]);
			} else {
				return done (null,false, {message : "login Fial"});
			}*/

			/* map을 이용한 코드*/
			members.map(member => {
				if(member.userid === userid && member.password === password) {
					return done(null, member)
				}
			})
			/* forEach를 이용한 코드 */ 
			members.forEach((member) => {
				if(menubar.userid === userid && menubar.password === password) {
					return done(null, member);
				}
			})
			return done(null, false, {message: "login Fail"});
		})

	);

};

export default exportPassport