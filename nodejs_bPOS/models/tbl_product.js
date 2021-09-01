module.exports = ( sequelize, DataTypes) => {

	// tbl_product가 table의 이름(변수, 객체)
	// tbl_product.findAll().. 처럼 사용한다
	// tbl_products.findall() 처럼 사용 금지
	const product = sequelize.define("tbl_product",
	{
		p_code : { 
			type: DataTypes.STRING(5),
			primaryKey: true, 
		},
		p_name : { 
			type: DataTypes.STRING, 
			allowNull: false, // NOT NULL로 설정하는 것
		},
		p_price : { 
			type: DataTypes.INTEGER,
			allowNull: false, 
		},
		p_rem : { type: DataTypes.STRING },
		
	},
	
	{ timestamps: false }

	);
	return product;
};