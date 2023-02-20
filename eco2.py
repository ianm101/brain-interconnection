import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

n = 901
mu = 2.303
sd = 1

# generate the normal distribution with numpy's random.normal function

means = []
sds = []
meds = []
for it in range(2000):
    normal_dist = np.random.normal(mu, sd, n)
    # remove the lowest 15% of values
    threshold = np.percentile(normal_dist, 40.79)
    filtered_dist = normal_dist[normal_dist >= threshold]
    means.append(np.mean(filtered_dist))
    sds.append(np.std(filtered_dist))
    meds.append(np.median(filtered_dist))

print(np.mean(means))
print(np.mean(sds))
mean_of_meds = np.mean(meds)
print(np.exp(mean_of_meds))

#print(f'CDF: {norm.cdf(-0.223558)}')
