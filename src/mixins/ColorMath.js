export const ColorMath = {
    data() {
        return {
			// Credit for matrix values: https://ixora.io/projects/colorblindness/color-blindness-simulation-research/
			lms_filter: [[0.31399022, 0.63951294, 0.04649755],
		                 [0.15537241, 0.75789446, 0.08670142],
		                 [0.01775239, 0.10944209, 0.87256922]],

		    rgb_filter: [[ 5.47221206, -4.6419601,   0.16963708],
		                 [-1.1252419,   2.29317094, -0.1678952],
		                 [ 0.02980165, -0.19318073,  1.16364789]],

			protanopia_filter: [[0, 1.05118294, -0.05116099],
                                [0, 1,           0],
                                [0, 0,           1]],

            deuteranopia_filter: [[1,         0, 0],
                                  [0.9513092, 0, 0.04866992],
                                  [0,         0, 1]],

			protanomaly_filter: [[0, 1.05118294, -0.05116099],
							 	 [0, 1,           0],
								 [0, 0,           1]],

			deuteranomaly_filter: [[1,         0, 0],
								   [0.9513092, 0, 0.04866992],
								   [0,         0, 1]],

			tritanopia_filter: [[ 1,		  0,		  0],
								[ 0, 		  1, 		  0],
								[-0.86744736, 1.86727089, 0]],

			tritanomaly_filter: [[ 1,		   0,		   0],
								 [ 0, 		   1, 		   0],
								 [-0.86744736, 1.86727089, 0]],

			protanomaly_values:	  [ 1.05118294, -0.05116099],
			deuteranomaly_values: [ 0.9513092,   0.04866992],
			tritanomaly_values:   [-0.86744736,  1.86727089]
        }
    },
    methods: {
		protanomalyFilter(column_vector, ratio) {
			let rgb = this.standardToLinearRGB(column_vector);
			this.protanomaly_filter[0][0] = 1 - (1 / 100 * ratio);
			this.protanomaly_filter[0][1] = this.protanomaly_values[0] / 100 * ratio;
			this.protanomaly_filter[0][2] = this.protanomaly_values[1] / 100 * ratio;
			let lms = this.matrixMult(this.lms_filter, rgb);
			let lms_filtered = this.matrixMult(this.protanomaly_filter, lms);
			let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return this.linearToStandardRGB(rgb_filtered);
		},

		deuteranomalyFilter(column_vector, ratio) {
			let rgb = this.standardToLinearRGB(column_vector);
			this.deuteranomaly_filter[1][0] = this.deuteranomaly_values[0] / 100 * ratio;
			this.deuteranomaly_filter[1][1] = 1 - (1 / 100 * ratio);
			this.deuteranomaly_filter[1][2] = this.deuteranomaly_values[1] / 100 * ratio;
			let lms = this.matrixMult(this.lms_filter, rgb);
			let lms_filtered = this.matrixMult(this.deuteranomaly_filter, lms);
			let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return this.linearToStandardRGB(rgb_filtered);
		},

		tritanomalyFilter(column_vector, ratio) {
			let rgb = this.standardToLinearRGB(column_vector);
			this.tritanomaly_filter[2][0] = this.tritanomaly_values[0] / 100 * ratio;
			this.tritanomaly_filter[2][1] = this.tritanomaly_values[1] / 100 * ratio;
			this.tritanomaly_filter[2][2] = 1 - (1 / 100 * ratio);
			let lms = this.matrixMult(this.lms_filter, rgb);
			let lms_filtered = this.matrixMult(this.tritanomaly_filter, lms);
			let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return this.linearToStandardRGB(rgb_filtered);
		},

		protonopiaFilter(column_vector) {
			let rgb = this.standardToLinearRGB(column_vector);
			let filter = this.protanopia_filter;
			let lms = this.matrixMult(this.lms_filter, rgb);
			let lms_filtered = this.matrixMult(filter, lms);
			let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return this.linearToStandardRGB(rgb_filtered);
		},

        deuteranopiaFilter(column_vector) {
			let rgb = this.standardToLinearRGB(column_vector);
			let filter = this.deuteranopia_filter;
            let lms = this.matrixMult(this.lms_filter, rgb);
            let lms_filtered = this.matrixMult(filter, lms);
            let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return this.linearToStandardRGB(rgb_filtered);
        },

		tritanopiaFilter(column_vector) {
			let rgb = this.standardToLinearRGB(column_vector);
			let filter = this.tritanopia_filter;
			let lms = this.matrixMult(this.lms_filter, rgb);
			let lms_filtered = this.matrixMult(filter, lms);
			let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return this.linearToStandardRGB(rgb_filtered);
		},

        matrixMult(A, B) {
            let a_rows = A.length, a_cols = A[0].length;
            let b_rows = B.length, b_cols = B[0].length;
            let matrix = new Array(a_cols);
            for(var r = 0; r < a_rows; r++) {
                matrix[r] = new Array(b_cols);
                for(var c = 0; c < b_cols; c++) {
                    matrix[r][c] = 0;
                    for(var i = 0; i < a_cols; i++) {
                        matrix[r][c] += A[r][i] * B[i][c];
                    }
                }
            }
            return matrix;
        },

		getColor(column_vector) {
			return {r: Math.min(255, Math.max(0, Math.round(column_vector[0][0]))),
					g: Math.min(255, Math.max(0, Math.round(column_vector[1][0]))),
					b: Math.min(255, Math.max(0, Math.round(column_vector[2][0])))};
		},

		toColumnVector(color) {
			return [[color.r], [color.g], [color.b]];
		},

		standardToLinearChannel(standard) {
			standard = standard / 255;
			let linear;
			if(standard <= 0.04045) linear = standard / 12.92;
			else linear = Math.pow((standard + 0.055) / 1.055, 2.4);
			return linear;
		},

		linearToStandardChannel(linear) {
			let standard;
			if(linear <= 0.0031308) standard = linear * 12.92;
			else standard = 1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055;
			standard = standard * 255;
			return standard;
		},

		standardToLinearRGB(column_vector) {
			for(let i; i < 2; i++) {
				column_vector[i][0] = standardToLinearChannel(column_vector[i][0]);
			}
			return column_vector;
		},

		linearToStandardRGB(column_vector) {
			for(let i; i < 2; i++) {
				column_vector[i][0] = standardToLinearChannel(column_vector[i][0]);
			}
			return column_vector;
		},

		relativeLuminance(color) {
			let r = color.r / 255;
			r = r <= 0.03928 ? r / 12.92 : Math.pow(((r + 0.055)/1.055), 2.4);
			let g = color.g / 255;
			g = g <= 0.03928 ? g / 12.92 : Math.pow(((g + 0.055)/1.055), 2.4);
			let b = color.b / 255;
			b = b <= 0.03928 ? b / 12.92 : Math.pow(((b + 0.055)/1.055), 2.4);
			return ( 0.2126*r + 0.7152*g + 0.0722*b );
		},

		contrastRatio(textColor, backgroundColor) {
			let ratio = (this.relativeLuminance(textColor) + 0.05) /
			 			(this.relativeLuminance(backgroundColor) + 0.05);
			return (1 / ratio).toFixed(1);
		}

    }
}
