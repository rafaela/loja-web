/**
 * Este arquivo inclui polyfills necessários para o Angular e é carregado antes do aplicativo.
 * Você pode adicionar seus próprios polyfills adicionais a este arquivo.
 *
 * Este arquivo está dividido em duas seções:
 *   1. Polyfills do navegador. Estes são aplicados antes de carregar o ZoneJS e são classificados por navegadores.
 *   2. Aplicação de imports. Estes são carregados depois do ZoneJS e devem ser importados conforme necessário.
 *
 * A documentação do Angular é um excelente recurso para mais informações sobre polyfills.
 */

// Polyfills do navegador
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';

// Zone JS é necessário para o Angular.
import 'zone.js/dist/zone';  // Incluído com o Angular CLI.