import passport from "passport";
import passportLocal from "passport-local";
import User from "../model/User.js";

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

		}, (userid, password, done) => {

				// 변수 이름과 값의 이름이 같으므로 하나만 써도됨
				// userid: userid, password: password

				/**
				 * login이 성공했을 경우
				 *  done() 함수의 2번째 매개변수에 로그인 정보를 담아주면
				 * 	 router 에서 req.user 객체가 생성되고
				 * 	 로그인한 정보를 추출할 수 있다
				 */
				User.findOne({userid:userid, password: password}, (err,data) => {

					if(err) {
						return done(err);
					}
					// 유저 데이터가 없으면
					if(!data) {
						return done(null, false, 
							{ message : "존재하지 않는 ID 입니다",
						});
					}

					// 사용자 ID는 있는데 DB에 저장되어있는 PW와 입력한 Pw가 다르면
					if(data.password != password) {
						return done(null, false, {message: "비밀번호 오류"});
					
					}

					// 정상적으로 모두 완료되면 데이터를 모두 첨부 시켜준다
					return done(null, data);
				})

				// return done (null, {userid:"root", password: "12345"});
		})

	);

};

export default exportPassport