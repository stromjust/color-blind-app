export const ColorMath = {
    data() {
        return {
            lms_filter: [[17.8824, 43.5161, 4.11935],
                         [3.45565,  27.1554, 3.86714],
                         [0.0299566, 0.18431, 1.46709]],
            rgb_filter: [[ 0.080944,    -0.130504,   0.116721],
                         [-0.0102485,    0.0540194, -0.113615],
                         [-0.000365294, -0.0041216,  0.693513]],
            protanopia_filter: [[0, 2.02344, -2.52581],
                                  [0, 1,        0],
                                  [0, 0,        1]],
            deuteranopia_filter: [[1,        0, 0],
                                  [0.494207, 0, 1.24827],
                                  [0,        0, 1]],
			protanomaly_filter: [[0, 2.02344, -2.52581],
								[0, 1,        0],
								[0, 0,        1]],
			deuteranomaly_filter: [[1,        0, 0],
								  [0.494207, 0, 1.24827],
								  [0,        0, 1]],
			protanomaly_values: [2.02344, -2.52581],
			deuteranomaly_values: [0.494207, 1.24827]
        }
    },
    methods: {
        getColor(column_vector) {
            return {r: column_vector[0][0], g: column_vector[1][0], b: column_vector[2][0] };
        },

        toColumnVector(color) {
            return [[color.r], [color.g], [color.b]];
        },

		deuteranomalyFilter(column_vector, ratio) {
			let rgb = column_vector;
			this.deuteranomaly_filter[1][0] = this.deuteranomaly_values[0] / 100 * ratio;
			this.deuteranomaly_filter[1][1] = 1 - (1 / 100 * ratio);
			this.deuteranomaly_filter[1][2] = this.deuteranomaly_values[1] / 100 * ratio;
			let lms = this.matrixMult(this.lms_filter, rgb);
			let lms_filtered = this.matrixMult(this.deuteranomaly_filter, lms);
			let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return rgb_filtered;
		},

		protanomalyFilter(column_vector, ratio) {
			let rgb = column_vector;
			this.protanomaly_filter[0][0] = 1 - (1 / 100 * ratio);
			this.protanomaly_filter[0][1] = this.protanomaly_values[0] / 100 * ratio;
			this.protanomaly_filter[0][2] = this.protanomaly_values[1] / 100 * ratio;
			let lms = this.matrixMult(this.lms_filter, rgb);
			let lms_filtered = this.matrixMult(this.protanomaly_filter, lms);
			let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
			return rgb_filtered;
		},

        protonopiaFilter(column_vector) {
            let rgb = column_vector;
			let filter = this.protanopia_filter;
            let lms = this.matrixMult(this.lms_filter, rgb);
            let lms_filtered = this.matrixMult(filter, lms);
            let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
            return rgb_filtered;
        },

        deuteranopiaFilter(column_vector) {
            let rgb = column_vector;
			let filter = this.deuteranopia_filter;
            let lms = this.matrixMult(this.lms_filter, rgb);
            let lms_filtered = this.matrixMult(filter, lms);
            let rgb_filtered = this.matrixMult(this.rgb_filter, lms_filtered);
            return rgb_filtered;
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
        }
    }
}
