goog.provide('ol.format.Feature');

goog.require('goog.functions');
goog.require('ol.proj');



/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for feature formats.
 * {ol.format.Feature} subclasses provide the ability to decode and encode
 * {@link ol.Feature} objects from a variety of commonly used geospatial
 * file formats.  See the documentation for each format for more details.
 *
 * @constructor
 */
ol.format.Feature = function() {
};


/**
 * @return {Array.<string>} Extensions.
 */
ol.format.Feature.prototype.getExtensions = goog.abstractMethod;


/**
 * @return {ol.format.FormatType} Format.
 */
ol.format.Feature.prototype.getType = goog.abstractMethod;


/**
 * Read a single feature from a source.
 *
 * @param {ArrayBuffer|Document|Node|Object|string} source Source.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {ol.Feature} Feature.
 */
ol.format.Feature.prototype.readFeature = goog.abstractMethod;


/**
 * Read all features from a source.
 *
 * @param {ArrayBuffer|Document|Node|Object|string} source Source.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {Array.<ol.Feature>} Features.
 */
ol.format.Feature.prototype.readFeatures = goog.abstractMethod;


/**
 * Read a single geometry from a source.
 *
 * @param {ArrayBuffer|Document|Node|Object|string} source Source.
 * @param {olx.format.ReadOptions=} opt_options Read options.
 * @return {ol.geom.Geometry} Geometry.
 */
ol.format.Feature.prototype.readGeometry = goog.abstractMethod;


/**
 * Read the projection from a source.
 *
 * @param {ArrayBuffer|Document|Node|Object|string} source Source.
 * @return {ol.proj.Projection} Projection.
 */
ol.format.Feature.prototype.readProjection = goog.abstractMethod;


/**
 * Encode a feature in this format.
 *
 * @param {ol.Feature} feature Feature.
 * @param {olx.format.WriteOptions=} opt_options Write options.
 * @return {ArrayBuffer|Node|Object|string} Result.
 */
ol.format.Feature.prototype.writeFeature = goog.abstractMethod;


/**
 * Encode an array of features in this format.
 *
 * @param {Array.<ol.Feature>} features Features.
 * @param {olx.format.WriteOptions=} opt_options Write options.
 * @return {ArrayBuffer|Node|Object|string} Result.
 */
ol.format.Feature.prototype.writeFeatures = goog.abstractMethod;


/**
 * Write a single geometry in this format.
 *
 * @param {ol.geom.Geometry} geometry Geometry.
 * @param {olx.format.WriteOptions=} opt_options Write options.
 * @return {ArrayBuffer|Node|Object|string} Node.
 */
ol.format.Feature.prototype.writeGeometry = goog.abstractMethod;


/**
 * @param {ol.geom.Geometry} geometry Geometry.
 * @param {boolean} write Set to true for writing, false for reading.
 * @param {(olx.format.WriteOptions|olx.format.ReadOptions)=} opt_options
 *     Options.
 * @return {ol.geom.Geometry} Transformed geometry.
 * @protected
 */
ol.format.Feature.transformGeometry = function(
    geometry, write, opt_options) {
  var featureProjection = goog.isDef(opt_options) ?
      ol.proj.get(opt_options.featureProjection) : null;
  var dataProjection = goog.isDef(opt_options) ?
      ol.proj.get(opt_options.dataProjection) : null;
  if (!goog.isNull(featureProjection) && !goog.isNull(dataProjection) &&
      !ol.proj.equivalent(featureProjection, dataProjection)) {
    return (write ? geometry.clone() : geometry).transform(
        write ? featureProjection : dataProjection,
        write ? dataProjection : featureProjection);
  } else {
    return geometry;
  }
};
