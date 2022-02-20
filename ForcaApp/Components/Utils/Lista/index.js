import React from 'react';
import {View, Text, StyleSheet,  TouchableOpacity} from 'react-native'
import estilos from './estilos.js'
import ListItem from '../ListItem/index.js';

const Lista = ({data, })=>{
	/*const data = [
		{
			props_row:{},
			cols:[
				{
					label:'José Pedro',
					props_col:{}
				}
			]

		}
	]*/
	const props_row 			=  	data.hasOwnProperty('props_row') ? data.props_row : {};
	const acoes_left_row 		=  	data.hasOwnProperty('acoes_left_row') ? data.acoes_left_row : {};
	const acoes_right_row 		=  	data.hasOwnProperty('acoes_right_row') ? data.acoes_right_row : {};
	const no_leftac_action 		=  	data.hasOwnProperty('no_leftac_action') ? data.no_leftac_action : null;
	const no_right_action 		=  	data.hasOwnProperty('no_right_action') ? data.no_right_action : null;
	const cols 					=	data.hasOwnProperty('cols') ? data.cols : [];

	console.log('--------------------------------------- Parâmetros aqui ---------------------------------------')
	console.log(data)
	console.log('--------------------------------------- Parâmetros aqui ---------------------------------------')//

	return(
		<ListItem
            data={null}
            options_left={acoes_left_row}
            options_right={acoes_right_row}
            no_leftac_action={no_leftac_action}
			no_right_action={no_right_action}
             
        >
				<View
					style={[estilos.container]} {...props_row}
				>
					{
						props_row  ?
						(
								
									

										Array.isArray(cols) && cols.length > 0 ?
														(
											cols.map((col, idx, ar)=>{
												let label = col.hasOwnProperty('label') ? col.label : '';
												let props_col = col.hasOwnProperty('props_col') ? col.props_col : {} ;

		            							let actionCol=col.hasOwnProperty('actionCol') ? col.actionCol : ()=>null;
		            							let hasActionCol=col.hasOwnProperty('hasActionCol') ? col.hasActionCol : false;
		            							//console.log('------------------data col -----------------')
		            							//console.log(col)


												return(

													<View  key={'index'+idx+'label'} {...props_col} >
														{
															hasActionCol == true
															 ? 
																(

																	<TouchableOpacity
																		onPress={()=>{actionCol()}}
																	>
																		<Text style={[estilos.texto_col]}>
																			{label}

																		</Text>
																	</TouchableOpacity>
																)
															:
															 	(

																	<Text style={[estilos.texto_col]}>
																		{label}

																	</Text>
															 	)

														}
													</View>
													
												)

											})

										)
									:
									(
										''
									)
								
							
						)
						:
						(
							<View>
								<Text>Nenhum registro</Text>
							</View>
						)

					}
					

				</View>
		</ListItem>
	)
}

export default Lista;