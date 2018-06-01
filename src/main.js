/**
 *                                       By William Dunlop
 *  _______ _                   _       ____        _ _                 _       _       
 * |__   __| |                 (_)     |  _ \      (_) |               | |     | |      
 *    | |  | |__  _ __ ___  ___ _ ___  | |_) | ___  _| | ___ _ __ _ __ | | __ _| |_ ___ 
 *    | |  | '_ \| '__/ _ \/ _ \ / __| |  _ < / _ \| | |/ _ \ '__| '_ \| |/ _` | __/ _ \
 *    | |  | | | | | |  __/  __/ \__ \ | |_) | (_) | | |  __/ |  | |_) | | (_| | ||  __/
 *    |_|  |_| |_|_|  \___|\___| |___/ |____/ \___/|_|_|\___|_|  | .__/|_|\__,_|\__\___|
 *                            _/ |                               | |                    
 *                           |__/                                |_|                    
 */


import Core from './core'

/** 
 * Probably dont have to append App to window. 
 * Can look at simply calling upon it if we don't want app information to be public
 * */
window.app = new Core();