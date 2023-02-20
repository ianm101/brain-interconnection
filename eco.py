import numpy as np
import matplotlib.pyplot as plt

mu, sigma = 10, 2 # set mean and standard deviation
n = 900 # number of elements

# generate the normal distribution with numpy's random.normal function

means = []
sds = []
meds = []
filtered_dists = []
# for it in range(2000):
normal_dist = np.random.normal(mu, sigma, n)
# remove the lowest 15% of values
threshold = np.percentile(normal_dist, 15.7)
filtered_dist = normal_dist[normal_dist >= threshold]
# means.append(np.mean(filtered_dist))
# sds.append(np.std(filtered_dist))
# meds.append(np.median(filtered_dist))
# filtered_dists.append(filtered_dist)

# print(np.mean(means))
# print(np.mean(sds))
# print(np.mean(meds))


    




# create a histogram of the original / filtered distribution using matplotlib
plt.hist(normal_dist, bins=30, density=True, alpha=0.5, color='b', label='Original')

plt.hist(filtered_dist, bins=30, density=True, alpha=0.5, color='r', label='Filtered')

# create a histogram of the original distribution using matplotlib
# plt.hist(means, bins=30, density=True, alpha=0.5, color='b', label='Means')
# plt.hist(sds, bins=30, density=True, alpha=0.5, color='b', label='SDS')


# create a histogram of the filtered distribution using matplotlib
# plt.hist(sds, bins=30, density=True, alpha=0.5, color='r', label='')



# add labels and a legend
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Normal Distribution with mean=10 and std=2')
plt.legend()

# show the plot
plt.show()
